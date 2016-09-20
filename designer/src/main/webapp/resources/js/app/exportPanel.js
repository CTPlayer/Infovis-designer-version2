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
        "zrender/tool/color": "lib/zrender/zrender",
        "zrender/Storage" : "lib/zrender/zrender",
        "CanvasTag" : "customModule/CanvasTag/CanvasTag"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    },
    waitSeconds: 30
});

require(['jquery', 'infovis', 'options','CanvasTag', 'gridstack', 'bootstrap'],function($, infovis, baseOptions,CanvasTag){
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
                float: true
            };
            $('.grid-stack').gridstack(options);
            
            $.ajax({
               type: 'POST',
                url: 'getShareOptions',
               data: 'cids='+cids,
            success: function(data){
                    for(var i=0;i<cids.length;i++){
                        if(data[i].chartType.indexOf("text") < 0) {
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
                            CanvasTag().render(ids[i],JSON.parse(data[i].jsCode));
                        }
                    }
                }
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