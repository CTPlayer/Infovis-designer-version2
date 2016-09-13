/**
 * Created by ct on 2016/9/7.
 */
define(['jquery', 'infovis', 'knockout', 'knockback', 'options', 'formatData', 'app/appViewModel','zrender','CanvasTag',
    'bootstrap', 'gridstack', 'spectrum'],
    function($, infovis, ko, kb, baseOptions, formatData, appViewModel,zrender,CanvasTag){
    /**
     * 渲染设计面板图表菜单
     * @param target
     */
    var renderMenu = function(target){
        var allOptions = baseOptions.makeAllOptions();
        var engine = infovis.init(allOptions || {});
        //根据target判断不同的渲染方式以及事件绑定
        var charttype = target.attr("chartType")
        if(charttype.indexOf("text") < 0) {
            target.append('<div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">' +
                '<span style="display:none;">' +
                '<span id="chartTitle"></span>' +
                '<a href="#"><i class="glyphicon glyphicon-remove" style="color: white"></i></a>' +
                '<a href="#" data-toggle="modal" data-target="#optionModal"><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>' +
                '<a href="#"><i class="fa fa-cog" style="color: white"></i></a>' +
                '</span>' +
                '</div>');
        }else{
            target.append('<div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">' +
                '<span style="display:none;">' +
                '<span id="chartTitle"></span>' +
                '<a href="#"><i class="glyphicon glyphicon-remove" style="color: white"></i></a>' +
                '<a href="#" data-toggle="modal" data-target="#textOptionModal"><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>' +
                '</span>' +
                '</div>');
        }

        target.on('mouseenter mouseleave',function(e){
            var target = $("#operate",$(this));
            if(e.type == 'mouseenter'){
                target.stop();
                target.children().css("display","block");
                target.animate({height:'40px'});
            }else if(e.type == 'mouseleave'){
                target.stop();
                target.children().css("display","none");
                if(target.css('height') != '0px') {
                    target.animate({height: "0"});
                }
            }
        });

        //删除当前容器
        target.find('a').eq(0).click(function(){
            $("title").html("*Infovis-Designer");                                     //改动标记
            window.isSave = false;
            var area = $(this).parent().parent().parent();
            $(area).parent().remove();
        });

        //根据target判断不同的渲染方式以及事件绑定
        if(charttype.indexOf("text") < 0) {
            //将选中即将配置的图表渲染到配置面板
            //双向绑定
            target.find('a').eq(1).click(function () {
                var instance = engine.chart.getInstanceByDom($(this).parent().parent().parent()[0]);
                var type = instance.getOption().series[0].type;

                $("#loading").css("display", "block");
                $("#optionContainer").empty();
                $("#optionPanel").empty();

                $("#optionModal").on("shown.bs.modal", function (e) {
                    $("#loading").css("display", "none");
                    if (type == "bar" || type == "line") {
                        $("#optionPanel").html(formatData.tableAndConfigOfBarAndLine());
                        ko.applyBindings(appViewModel.bindTableAndConfigOfBarAndLine(instance.getOption(), engine), $("#optionPanel").children()[1]);  //开启双向绑定监听
                    } else if (type == "pie") {
                        $("#optionPanel").html(formatData.tableAndConfigOfPie());
                        ko.applyBindings(appViewModel.bindTableAndConfigOfPie(instance.getOption(), engine), $("#optionPanel").children()[1]);  //开启双向绑定监听
                    }
                });
            });

            target.find('a').eq(2).click(function () {
                $("title").html("Infovis-Designer");

                $(".grid-stack-placeholder").remove();
                // $("#fill").parent().remove();

                $(".app-container").addClass("loader");
                $(".loader-container").css("display", "block");

                var index = $(this).parent().parent().parent().attr("chartId");
                var arr = window.location.href.split("/");
                var exportId = $("#exportId").val();
                var shareHref = arr[0] + "//" + arr[2] + "/" + arr[3] + "/share.page?exportId=" + exportId;
                if (window.isSave == false) {
                    $.ajax({
                        type: 'POST',
                        url: "export",
                        data: {
                            "htmlCode": $(".grid-stack").html().trim(),
                            "exportId": exportId,
                            "extraMsg": shareHref
                        },
                        success: function () {
                            window.isSave = true;                     //点击导出后表明已保存

                            $("body").removeClass("loader");
                            $(".loader-container").css("display", "none");
                            top.window.location = "dataAnalysis.page?chartId=" + index + "&exportId=" + exportId;
                        },
                        error: function () {
                            alert("保存失败，请重试！");
                        }
                    });
                } else {
                    top.window.location = "dataAnalysis.page?chartId=" + index + "&exportId=" + exportId;
                }
            });
        }else{
            target.find('a').eq(1).click(function () {
                $("#textOptionContainer").empty();
                $("#textOptionPanel").empty();
            });
            var pzr = zrender.getInstance(target.attr("zid"));//原控件
            $("#textOptionModal").on("shown.bs.modal", function (e) {
                var option = pzr.storage.getShapeList()[0].style;
                $("#textOptionPanel").html(formatData.tableAndConfigOfText);
                var canvasTag = CanvasTag().render("textOptionContainer",option);
                ko.applyBindings(appViewModel.bindTableAndConfigOfText(option, canvasTag), $("#textOptionPanel").children()[1]);  //开启双向绑定监听
            })
        }
    };

    return {
        renderMenu : renderMenu
    }
});