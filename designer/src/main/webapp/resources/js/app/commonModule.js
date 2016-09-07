/**
 * Created by ct on 2016/9/7.
 */
define(['jquery'],function($){
    var renderChart = function(engine,chartType,sqlRecordingId){
        var color = $(".mark-item-color").find("span").text().trim();
        var angle = $(".mark-item-corner").find("span").text().trim();
        var tag = $(".mark-item-tag").find("span").text().trim();
        var xAxis = [];
        var yAxis = [];

        xAxis.push($(".xAxis").find("span").text().trim());
        yAxis.push($(".yAxis").find("span").text().trim());

        if(chartType == 'pie'){
            var builderModel = {
                'mark': {
                    'color': color,
                    'angle': angle,
                    'tag': tag
                }
            }
        }else if(chartType == 'line' || chartType == 'bar'){
            var builderModel = {
                'xAxis':  xAxis,
                'yAxis':  yAxis
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
            success: function(data){
                var editChart = engine.chart.init(document.getElementById("editArea"));
                editChart.setOption(data);
            }
        });
    }

    return {
        renderChart : renderChart
    }
});