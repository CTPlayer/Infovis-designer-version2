require.config({
    baseUrl: '/designer/resources/js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "jquery-ui": "lib/jquery-ui.min",
        "lodash": "lib/gridstack/js/lodash.min",
        "gridstack": "lib/gridstack/js/gridstack.min",
        "infovis": "lib/infovis.min",
        "options": "lib/charts/options"
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
            var options = {
                float: true
            };
            $('.grid-stack').gridstack(options);

            var containers = $("#exportContainer").children();
            for(var i=0;i<containers.length-1;i++){
                var exportChart = engine.chart.init(containers[i]);
                exportChart.setOption(JSON.parse($("#exportOption").html())[i]);
                window.addEventListener("resize",function(){
                    exportChart.resize();                                            //自适应窗口
                });
            }
        }
    })
});