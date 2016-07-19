require.config({
    baseUrl: 'allDependency',
    paths: {
        "jquery": "jquery-2.1.4.min",
        "bootstrap": "bootstrap.min",
        "echarts": "echarts",
        "jquery-ui": "jquery-ui.min",
        "lodash": "lodash.min",
        "gridstack": "gridstack"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery', 'echarts', 'gridstack', 'bootstrap'],function($, echarts){
    $(function(){
        if($("#exportContainer")){
            var options = {
                float: true
            };
            $('.grid-stack').gridstack(options);
            
            var containers = $("#exportContainer").children();
            for(var i=0;i<containers.length-1;i++){
                var exportChart = echarts.init(containers[i]);
                exportChart.setOption(JSON.parse($("#exportOption").html())[i]);    
                window.addEventListener("resize",function(){
                    exportChart.resize();                                            //自适应窗口
                });
            }
        } 
    })
});