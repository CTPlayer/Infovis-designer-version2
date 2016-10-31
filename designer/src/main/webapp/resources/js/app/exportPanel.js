require.config({
    baseUrl: 'resources/js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "jquery-ui": "lib/jquery-ui.min",
        "lodash": "lib/gridstack/js/lodash.min",
        "gridstack": "lib/gridstack/js/gridstack.min",
        "infovis": "lib/infovis.min",
        "options": "lib/charts/options",
        "domReady" : 'lib/domReady',
        "zrender": "lib/zrender/zrender",
        "zrender/shape/Rectangle": "lib/zrender/zrender",
        "zrender/shape/Image": "lib/zrender/zrender",
        "zrender/tool/color": "lib/zrender/zrender",
        "zrender/Storage" : "lib/zrender/zrender",
        "CanvasTag" : "customModule/CanvasTag/CanvasTag",
        "CanvasTagOfImage" : "customModule/CanvasTag/CanvasTagOfImage",
        "jrange" : 'lib/jRange/jquery.range'
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] },
        "jrange" : { "deps" :['jquery'] }
    },
    waitSeconds: 30
});

require(['jquery', 'infovis', 'options','CanvasTag','CanvasTagOfImage', 'jrange', 'gridstack', 'bootstrap'],function($, infovis, baseOptions,CanvasTag,CanvasTagOfImage){
    $(function(){
        var engine = infovis.init(baseOptions.makeAllOptions() || {});

        if($("#exportContainer")){
            var cids = [];     //图表id
            var ids = [];      //容器id
            var containers = $("#exportContainer").children();
            for(var i=0;i<containers.length;i++){
                cids.push($(containers[i]).children().first().attr("chartId"));
                ids.push($(containers[i]).children().first().attr("id"));
            }
            var options = {
                float: true,
                vertical_margin: 0
            };
            $('.grid-stack').gridstack(options);

            var containerAndModel = []; // 保存div和图表构建模型之间的关系
            var currentField = []; // 当前页面用到的所有数据集项,用于渲染过滤选项时只渲染用到的字段
            $.ajax({
               type: 'POST',
                url: 'getShareOptions',
               data: 'cids='+cids,
            success: function(data){
                    for(var i=0;i<cids.length;i++){
                        if(data[i].chartType.indexOf("text") < 0) {
                            if('mark' in JSON.parse(data[i].buildModel)){
                                currentField.push(JSON.parse(data[i].buildModel).mark.color);
                                currentField.push(JSON.parse(data[i].buildModel).mark.angle);
                            }else {
                                currentField.push(JSON.parse(data[i].buildModel).xAxis[0]);
                                currentField.push(JSON.parse(data[i].buildModel).yAxis[0]);
                            }
                            containerAndModel.push({"id":ids[i],"model":{'chartType': data[i].chartType,'dataRecordId': data[i].sqlRecordingId,'builderModel': JSON.parse(data[i].buildModel)}});
                            var exportChart = engine.chart.init($("#" + ids[i])[0]);
                            if(parseInt(data[i].isRealTime) == 0){
                                exportChart.setOption(JSON.parse(data[i].jsCode));
                            }else if(parseInt(data[i].isRealTime) == 1){
                                $.ajax({
                                    async: false,
                                    type: 'POST',
                                    contentType: "application/json; charset=utf-8",
                                    url: 'render',
                                    data: JSON.stringify({
                                        'chartType': data[i].chartType,
                                        'dataRecordId': data[i].sqlRecordingId,
                                        'builderModel': JSON.parse(data[i].buildModel)
                                    }),
                                    success: function(option){
                                        var newOption = JSON.parse(data[i].jsCode);
                                        newOption.series = option.series;
                                        exportChart.setOption(newOption);
                                    },
                                    error: function(){
                                        $("#" + ids[i]).text("当前图表渲染失败，请检查数据库连接是否正常。");
                                    }
                                });
                            }

                            window.addEventListener("resize", function () {
                                exportChart.resize();                                            //自适应窗口
                            });
                        }else{
                            if(data[i].chartType.indexOf("subGroupOfImage") < 0){
                                CanvasTag().render(ids[i],JSON.parse(data[i].jsCode));
                            }else{
                                var imgBase64 = JSON.parse(data[i].jsCode).image;
                                var option = JSON.parse(data[i].jsCode);
                                $("#"+ids[i]).parent().append([
                                    '<img style="display: none" src=\'data:image/jpg;base64,'+imgBase64+'\' >'
                                ].join(""));
                                option.image = $("#"+ids[i]).parent().find("img")[0];
                                CanvasTagOfImage().render(ids[i],"",option);
                            }
                        }
                    }
                }
            });

            var chartBuilderParams = [];
            $(".filterIcon").click(function(){
                $(".loader-container").css("display","block");
                var deffer01 = $.ajax({
                    type: 'POST',
                    async: false,
                    url: 'getShareOptions',
                    data: 'cids='+cids
                });
                deffer01.done(function(data){
                    for(var i=0;i<cids.length;i++){
                        if(data[i].chartType.indexOf("text") < 0) {
                            chartBuilderParams.push({chartType : data[i].chartType, dataRecordId : data[i].sqlRecordingId, builderModel : JSON.parse(data[i].buildModel)});
                        }
                    }
                });

                var deffer02 = $.ajax({
                    type: 'POST',
                    url: 'myChart/getFilterResults',
                    contentType: "application/json",
                    data: JSON.stringify(chartBuilderParams)
                });
                deffer02.done(function(data){
                    $(".loader-container").css("display","none");
                    var order = 0;                // checkbox id参数 slider-input id参数
                    for(var key in data){
                        $("#accordion").append(['<div class="panel panel-default">',
                            '<div class="panel-heading" role="tab" id="heading'+key+'">',
                            '<h4 class="panel-title">',
                            '<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+key+'" aria-expanded="true" aria-controls="collapseOne">数据集编号:',
                            key,
                            '</a>',
                            '</h4>',
                            '</div>',
                            '<div id="collapse'+key+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading'+key+'">',
                            '<div class="panel-body">',
                            '</div>',
                            '<button type="button" class="btn btn-success">确认</button>',
                            '</div>',
                            '</div>'].join(''));
                        for(var item in data[key][0]) {
                            if(currentField.indexOf(item) >= 0) {
                                var value = [];           // 保存数值项
                                for (var i = 0; i < data[key].length; i++) {
                                    value.push(data[key][i][item]);
                                }
                                var hasText = false;     // 判断是否有文字
                                for (var i = 0; i < value.length; i++) {
                                    if (isNaN(value[i])) {
                                        hasText = true;
                                    }
                                }
                                if (hasText == false) {
                                    $("#collapse" + key).find(".panel-body").append('<div class="row number" id=' + key + item + ' style="margin-top: 20px;margin-left: 5px;"><div style="margin-left: 5px;margin-bottom: 15px;"><div>' + item + '</div></div></div>');
                                    var min = Math.min.apply(null, value);
                                    var max = Math.max.apply(null, value);
                                    $("#" + key + item).append('<input type="hidden" id="slider' + order + '" class="slider-input" value="' + min + "," + max + '"/>');
                                    $('#slider' + order).jRange({
                                        from: min,
                                        to: max,
                                        scale: [min, max],
                                        step: 1,
                                        format: '%s',
                                        width: $("#accordion").width() - 55,
                                        showLabels: true,
                                        isRange: true
                                    });
                                    order++;
                                } else {
                                    $("#collapse" + key).find(".panel-body").append('<div class="row text" id=' + key + item + ' style="margin-top: 20px;margin-left: 5px;"><div style="margin-left: 5px;margin-bottom: 15px;"><div>' + item + '</div></div></div>');
                                    for (var i = 0; i < $.unique(value).length; i++) {
                                        $("#" + key + item).append([
                                            '<div class="checkbox3 checkbox-inline checkbox-check checkbox-light">',
                                            '<input type="checkbox" id="checkbox-fa-light-1' + order + '" checked="">',
                                            '<label for="checkbox-fa-light-1' + order + '">',
                                            $.unique(value)[i],
                                            '</label>',
                                            '</div>'
                                        ].join(''));
                                        order++;
                                    }
                                }
                            }
                        }

                        /**
                         * 为过滤项绑定事件
                         */
                        var filter = {};
                        $("#collapse"+key).find(".btn-success").click(function(){
                            var sqlId = $(this).parent().prev().attr("id").replace("heading","").trim();
                            filter[sqlId] = [];
                            $(this).prev().find(".row").each(function(){
                                var fieldName = $(this).children().eq(0).text().trim();
                                var fieldFilter = [];
                                if($(this).hasClass("text")){
                                    $(this).find("input:checkbox:checked").each(function(){
                                        fieldFilter.push($(this).next().text());
                                    });
                                    var filterParam = {};
                                    filterParam[fieldName] = fieldFilter;
                                    filter[sqlId].push(JSON.stringify(filterParam));
                                }else if($(this).hasClass("number")){
                                    var filterParam = {};
                                    filterParam[fieldName] = $(this).find("input").val();
                                    filter[sqlId].push(JSON.stringify(filterParam));
                                }
                            });
                            for(var i=0;i<containerAndModel.length;i++){
                                if(containerAndModel[i].model.dataRecordId == sqlId){
                                    if("filter" in containerAndModel[i].model.builderModel){
                                        containerAndModel[i].model.builderModel.filter = filter[sqlId];
                                        var id = containerAndModel[i].id;
                                        $.ajax({
                                            type: 'POST',
                                            async: false,
                                            contentType: "application/json; charset=utf-8",
                                            url: 'render',
                                            data: JSON.stringify(containerAndModel[i].model),
                                            success: function(data){
                                                var editChart = engine.chart.getInstanceByDom(document.getElementById(id));
                                                editChart.setOption(data,true);
                                            }
                                        });
                                    }else {
                                        containerAndModel[i].model.builderModel.filter = filter[sqlId];
                                        var id = containerAndModel[i].id;
                                        $.ajax({
                                            type: 'POST',
                                            async: false,
                                            contentType: "application/json; charset=utf-8",
                                            url: 'render',
                                            data: JSON.stringify(containerAndModel[i].model),
                                            success: function(data){
                                                var editChart = engine.chart.getInstanceByDom(document.getElementById(id));
                                                editChart.setOption(data,true);
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }).fail(function(){
                    $(".loader-container").css("display","none");
                    $("#accordion").html("筛选控件加载失败请刷新网页重试！");
                });
                $(this).unbind("click");
                $(this).click(function(){
                    $("#accordion").toggle();
                });
            });
        }
    })
});

require(['jquery','domReady'], function ($,domReady) {
    domReady(function () {
        //This function is called once the DOM is ready.
        var deferred = $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'myPanel/crud',
            data : {
                exportId : $("#exportId").val()
            },
            headers :{
                oper : 'query'
            }
        });
        deferred.done(function(data){
            if(data.myPanel.backgroundClass){
                $('body').addClass(data.myPanel.backgroundClass);
            }else{
                $('body').addClass('background-default');
            }
        });
    });
});