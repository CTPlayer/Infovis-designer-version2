/**
 * Created by ct on 2016/9/7.
 */
define(['jquery','knockout','jrange'], function($,ko){
    var renderChart = function(engine,chartType,sqlRecordingId,filterContent){
        var color = $(".mark-item-color").find("span").text().trim();
        var angle = $(".mark-item-corner").find("span").text().trim();
        var tag = $(".mark-item-tag").find("span").text().trim();
        var xAxis = [];
        var yAxis = [];

        xAxis.push($(".xAxis").find("span").text().trim());
        yAxis.push($(".yAxis").find("span").text().trim());

        if(chartType == 'pie' || chartType == 'ring'){
            var builderModel = {
                'mark': {
                    'color': color,
                    'angle': angle,
                    'tag': tag
                },
                'filter':filterContent
            }
        }else if(chartType == 'line' || chartType == 'bar'){
            var builderModel = {
                'xAxis':  xAxis,
                'yAxis':  yAxis,
                'filter':filterContent
            }
        }

        window.bmodel = builderModel;         //用于插入图表关联信息

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: 'render',
            data: JSON.stringify({
                'chartType': chartType,
                'dataRecordId': sqlRecordingId,
                'builderModel': builderModel
            }),
            success: function(option){
                var currentChart = engine.chart.getInstanceByDom(document.getElementById("editArea"));
                var editOption = currentChart.getOption();
                if(chartType == editOption.series[0].type){
                    editOption.series[0].data = option.series[0].data;
                    if('legend' in option){
                        editOption.legend.data = option.legend.data;
                    }
                    currentChart.setOption(editOption);
                }else {
                    var editChart = engine.chart.init(document.getElementById("editArea"));
                    editChart.setOption(option);
                }
            }
        });
    };

    /**
     * 渲染过滤视图
     * @param chartType 图表类型
     * @param sqlRecordingId 数据集id
     * @param targetText 当前拖动图标值
     * @param dragDataType 当前拖动图标值类型
     * @param filterPanel 过滤视图jquery对象
     */
    var getFilterResult = function(chartType,sqlRecordingId,targetText,dragDataType,filterPanel){
        var filter = [];
        if(targetText != null){
            filter.push(targetText);
        }else {
            filter.push('');
        }
        var builderModel = {
            'filter': filter
        };

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: 'myChart/getFilterResult',
            data: JSON.stringify({
                'chartType': chartType,
                'dataRecordId': sqlRecordingId,
                'builderModel': builderModel
            }),
            success: function(data){
                if(dragDataType == 'text'){
                    filterPanel.find(".panel-body").html(['<div class="alert fresh-color alert-info" role="alert" style="text-align: center;font-size: 15px;">',
                        '<strong>列选项</strong>',
                        '</div>',
                        '<div class="row textContainer" style="margin-left:30px;height: 100px;overflow: auto">',
                        '</div>'
                    ].join(""));
                    var numberResult = [];
                    for(var i=0;i<data.filterResult.length;i++) {
                        numberResult.push(data.filterResult[i][targetText]);
                    }
                    for(var i=0;i<$.unique(numberResult).length;i++){
                        filterPanel.find(".textContainer").append('<div class="checkbox3 checkbox-inline checkbox-check checkbox-light">'+
                            '<input type="checkbox" id="checkbox-fa-light-'+i+targetText+'" checked="">'+
                            '<label for="checkbox-fa-light-'+i+targetText+'" style="padding-left: 30px;line-height: 25px;">'+$.unique(numberResult)[i]+
                            '</label>'+
                            '</div>');
                    }
                }else if(dragDataType == 'number'){
                    filterPanel.find(".panel-body").html(['<div class="alert fresh-color alert-info" role="alert" style="text-align: center;font-size: 15px;">',
                        '<strong>值范围</strong>',
                        '</div>',
                        '<div class="numberContainer" style="margin-bottom: 20px;text-align: center">',
                        '</div>'].join(""));
                    filterPanel.find(".numberContainer").html(
                        '<div><input type="text" placeholder="左边界" data-bind="value: rangeLeft, valueUpdate: \'keyup\'" style="display: inline-block;float: left"><input type="text" placeholder="右边界" data-bind="value: rangeRight, valueUpdate: \'keyup\'" style="display: inline-block;float: right"></div>'+
                        '<div style="clear: both"></div>'+
                        '<div style="margin-top: 20px;" class="numberRange"><input type="hidden" class="slider-input"/></div>');
                    var numberResult = [];
                    var hasText = false;     // 判断是否有文字
                    for(var i=0;i<data.filterResult.length;i++){
                        numberResult.push(data.filterResult[i][targetText]);
                        if(isNaN(data.filterResult[i][targetText])){
                            hasText = true;
                        }
                    }
                    if(hasText == false){
                        var min = Math.min.apply(null,numberResult);
                        var max = Math.max.apply(null,numberResult);
                        var viewModel = function(left , right){
                            this.rangeLeft = ko.observable(left);
                            this.rangeRight = ko.observable(right);
                            ko.computed(function(){
                                filterPanel.find('.numberRange').html('<input type="hidden" class="slider-input"/>');
                                filterPanel.find(".slider-input").attr("value",this.rangeLeft()+","+this.rangeRight());
                                filterPanel.find('.slider-input').jRange({
                                    from: min,
                                    to: max,
                                    step: 1,
                                    scale: [min,max],
                                    format: '%s',
                                    width: filterPanel.find(".numberContainer").width(),
                                    showLabels: true,
                                    isRange : true,
                                    ondragend : function(){
                                        ko.cleanNode(filterPanel.find(".numberContainer")[0]);
                                        ko.applyBindings(new viewModel(filterPanel.find(".slider-input").val().split(",")[0],filterPanel.find(".slider-input").val().split(",")[1]),filterPanel.find(".numberContainer")[0]);
                                    },
                                    onbarclicked : function(){
                                        ko.cleanNode(filterPanel.find(".numberContainer")[0]);
                                        ko.applyBindings(new viewModel(filterPanel.find(".slider-input").val().split(",")[0],filterPanel.find(".slider-input").val().split(",")[1]),filterPanel.find(".numberContainer")[0]);
                                    }
                                });
                            },this);
                        };
                        ko.applyBindings(new viewModel(min,max),filterPanel.find(".numberContainer")[0]);
                    }else {
                        filterPanel.find(".numberContainer").html("当前值范围中包含非数字项，请检查或者转换为维度");
                    }
                }
            }
        });
    };

    return {
        renderChart : renderChart,
        getFilterResult : getFilterResult
    }
});