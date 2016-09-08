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
        "domReady" : 'lib/domReady'
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery', 'infovis', 'options', 'gridstack', 'bootstrap'],function($, infovis, baseOptions){
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
                        var exportChart = engine.chart.init($("#"+ids[i])[0]);
                        exportChart.setOption(JSON.parse(data[i].jsCode));

                        window.addEventListener("resize",function(){
                            exportChart.resize();                                            //自适应窗口
                        });
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
})