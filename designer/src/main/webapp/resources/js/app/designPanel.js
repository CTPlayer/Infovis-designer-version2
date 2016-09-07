/**
 * Created by ct on 2016/8/13.
 */
require.config({
    baseUrl: 'resources/js',
    paths: {
        "options": "lib/charts/options",           //图表初始option配置文件
        "formatData": "lib/charts/formatData",
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "jquery-ui": "lib/jquery-ui.min",
        "lodash": "lib/gridstack/js/lodash.min",
        "gridstack": "lib/gridstack/js/gridstack.min",
        "knockout": "lib/knockout/knockout-3.4.0",
        "backbone": "lib/backbone/backbone-min",
        "underscore": "lib/underscore/underscore-min",
        "knockback": "lib/knockback.min",
        "spectrum": "lib/bootstrap/js/spectrum",
        "infovis": "lib/infovis.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery', 'infovis', 'knockout', 'knockback', 'options', 'formatData', 'app/appViewModel',
        'bootstrap', 'gridstack', 'spectrum'],
    function($, infovis, ko, kb, baseOptions, formatData, appViewModel){

        $(function() {
            $(".navbar-expand-toggle").click(function() {
                $(".app-container").toggleClass("expanded");
                return $(".navbar-expand-toggle").toggleClass("fa-rotate-90");
            });
            return $(".navbar-right-expand-toggle").click(function() {
                $(".navbar-right").toggleClass("expanded");
                return $(".navbar-right-expand-toggle").toggleClass("fa-rotate-90");
            });
        });

        $(function() {
            return $(".side-menu .nav .dropdown").on('show.bs.collapse', function() {
                return $(".side-menu .nav .dropdown .collapse").collapse('hide');
            });
        });

        $(function(){
            $(".panel-default").click(function(){
                $(".panel-default").removeClass("active");
                $(this).addClass("active");
            });

            $(".side-menu-container").find("li").eq(1).click(function(){
                $(".thumbnail").removeClass("selected");
            });
        });

        $(function(){
            $(".navbar-right").children().on('mouseenter mouseleave',function(e){
                if(e.type == 'mouseenter'){
                    $(this).addClass("danger");
                }else if(e.type == 'mouseleave'){
                    $(this).removeClass("danger");
                }
            });
        });

        $(function(){
            $.ajax({
               type: 'POST',
               url: 'selectChartInfo',
               success: function(response){
                   for(var i=0;i<response.data.length;i++){
                       if(response.data[i].chartType == 'pie'){
                           $("#myChart").find(".row").append('<div class="thumbnail" data-cid="'+response.data[i].id+'" style="width: 200px;margin-left: 10px;float: left"><img src="resources/img/pie_chart.png" alt="..."><p style="text-align: center">'+response.data[i].chartName+'</p></div>');
                       }else if(response.data[i].chartType == 'line'){
                           $("#myChart").find(".row").append('<div class="thumbnail" data-cid="'+response.data[i].id+'" style="width: 200px;margin-left: 10px;float: left"><img src="resources/img/line_chart.png" alt="..."><p style="text-align: center">'+response.data[i].chartName+'</p></div>');
                       }else if(response.data[i].chartType == 'bar'){
                           $("#myChart").find(".row").append('<div class="thumbnail" data-cid="'+response.data[i].id+'" style="width: 200px;margin-left: 10px;float: left"><img src="resources/img/bar_chart.png" alt="..."><p style="text-align: center">'+response.data[i].chartName+'</p></div>');
                       }
                   }
                   $(".thumbnail").click(function(){
                       if($(this).hasClass("selected")){
                           $(this).removeClass("selected");
                       }else{
                           $(this).addClass("selected");
                       }
                   });
               }
            });
        });

        $(function(){
            var allOptions = baseOptions.makeAllOptions();
            var engine = infovis.init(allOptions || {});

            window.isSave = true;   //记录页面是否有改动

            var order  = 0;
            //给order赋值，用来在已有面板中继续添加图标时能接着前面已有图表的order顺序
            var containers = $(".grid-stack").children();
            for(var i=0;i<containers.length;i++){
                if($(containers[i]).children().first().attr("id")){
                    order = $(containers[i]).children().first().attr("id");
                }
            }

            var options = {
                float: true,
                vertical_margin: 10
            };
            $('.grid-stack').gridstack(options);

            var grid = $('.grid-stack').data('gridstack');

            var add_new_widget = function (pagex,pagey,cid) {
                order++;
                var node = {
                    x: pagex,
                    y: pagey,
                    width: 4,
                    height: 4
                };
                var nWidget = grid.add_widget($('<div>'+
                    '<div class="grid-stack-item-content"' + 'id="'+ order + '"chartId="' + cid+ '">'+
                    '</div>'+
                    '</div>'),node.x, node.y, node.width, node.height);
            };

            $("#myChart").find(".btn-primary").click(function(){
                $(".thumbnail").each(function(){
                    if($(this).hasClass("selected")){
                        var cid = $(this).attr("data-cid");
                        $.ajax({
                            type: 'POST',
                            url: 'selectOneChartInfo',
                            data: "id=" + cid,
                            success: function(data){
                                $("title").html("*Infovis-Designer");                                     //改动标记
                                window.isSave = false;

                                add_new_widget(0,0,cid);
                                engine.chart.init($("#"+order)[0]).setOption(JSON.parse(data.jsCode));

                                // 图表初始化完成后添加菜单
                                $("#"+order).append('<div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">'+
                                    '<span style="display:none;">'+
                                    '<a href="#"><i class="glyphicon glyphicon-remove" style="color: white"></i></a>'+
                                    '<a href="#" data-toggle="modal" data-target=".bs-option-modal-lg"><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>'+
                                    '<a href="#"><i class="fa fa-cog" style="color: white"></i></a>'+
                                    '</span>'+
                                    '</div>');
                                $("#"+order).on('mouseenter mouseleave',function(e){
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
                                $("#"+order).find('a').eq(0).click(function(){
                                    var area = $(this).parent().parent().parent();
                                    $(area).parent().remove();
                                });

                                //将选中即将配置的图表渲染到配置面板
                                //双向绑定
                                $("#"+order).find('a').eq(1).click(function(){
                                    var instance = engine.chart.getInstanceByDom($(this).parent().parent().parent()[0]);
                                    var type = instance.getOption().series[0].type;

                                    $("#loading").css("display","block");
                                    $("#optionContainer").empty();
                                    $("#optionPanel").empty();

                                    $("#optionModal").on("shown.bs.modal",function(e) {
                                        $("#loading").css("display","none");
                                        if (type == "bar" || type == "line") {
                                            $("#optionPanel").html(formatData.tableAndConfigOfBarAndLine());
                                            ko.applyBindings(appViewModel.bindTableAndConfigOfBarAndLine(instance.getOption(), engine), $("#optionPanel").children()[1]);  //开启双向绑定监听
                                        } else if (type == "pie") {
                                            $("#optionPanel").html(formatData.tableAndConfigOfPie());
                                            ko.applyBindings(appViewModel.bindTableAndConfigOfPie(instance.getOption(), engine), $("#optionPanel").children()[1]);  //开启双向绑定监听
                                        }
                                    });
                                });

                                $("#"+order).find('a').eq(2).click(function(){
                                    $("title").html("Infovis-Designer");

                                    $(".grid-stack-placeholder").remove();
                                    $("#fill").parent().remove();

                                    $(".app-container").addClass("loader");
                                    $(".loader-container").css("display","block");

                                    var index = $(this).parent().parent().parent().attr("chartId");
                                    var arr = window.location.href.split("/");
                                    var exportId = $("#exportId").val();
                                    var shareHref = arr[0]+"//"+arr[2]+"/"+arr[3]+"/share.page?exportId="+exportId;
                                    if(window.isSave == false) {
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
                                                top.window.location = "dataAnalysis.page?chartId=" + index;
                                            },
                                            error: function () {
                                                alert("保存失败，请重试！");
                                            }
                                        });
                                    }else{
                                        top.window.location = "dataAnalysis.page?chartId=" + index;
                                    }
                                });

                            }
                        });
                    }
                });
                $("#myChart").modal('toggle');
            });

            $(".grid-stack").on("resizestop",function(event,ui){
                $("title").html("*Infovis-Designer");                                     //改动标记
                window.isSave = false;
                var id = ui.element[0].firstChild.getAttribute("id");
                engine.chart.getInstanceByDom(document.getElementById(id)).resize();
                window.addEventListener("resize",function(){
                    engine.chart.getInstanceByDom(document.getElementById(id)).resize();
                });
            });

            /**
             * 保存当前设计面板
             */
            $("#exportHtml").click(function(){
                $("title").html("Infovis-Designer");
            
                $(".grid-stack-placeholder").remove();
                $("#fill").parent().remove();
            
                $(".app-container").addClass("loader");
                $(".loader-container").css("display","block");
            
                var arr = window.location.href.split("/");
                var exportId = $("#exportId").val();
                var shareHref = arr[0]+"//"+arr[2]+"/"+arr[3]+"/share.page?exportId="+exportId;

                $.ajax({
                    type: 'POST',
                    url: "export",
                    data: {
                        "htmlCode": $(".grid-stack").html().trim(),
                        "exportId": exportId,
                        "extraMsg": shareHref
                    },
                    success : function(){
                        window.isSave = true;                           //点击导出后表明已保存

                        $("body").removeClass("loader");
                        $(".loader-container").css("display","none");
                        top.window.location = "query.page";
                    },
                    error : function(){
                        alert("保存失败，请重试！");
                    }
                });

            });

            // 为了防止再次进入以后设计面板时先前的图表不能自定义大小，这里获取先前图表的容器属性，重新添加容器并渲染图表
            var containers = $(".grid-stack").children();

            containers.remove();
            var cids = [];          //保存图表id
            var ids = [];           //保存容器id
            //每个已存在容器的y坐标需要单独获取
            var positionY = [];
            for(var i=0;i<containers.length-1;i++) {
                positionY.push($(containers[i]).attr("data-gs-y"));
            }

            // 解决上下容器间距问题而添加的一个div
            grid.add_widget($('<div style="display: none">'+
                '<div class="grid-stack-item-content"' + 'id="fill">'+
                '</div>'+
                '</div>'),0, 0, 12, 0);

            for(var i=0;i<containers.length-1;i++) {
                var x = $(containers[i]).attr("data-gs-x");
                var y = positionY[i];
                var width = $(containers[i]).attr("data-gs-width");
                var height = $(containers[i]).attr("data-gs-height");
                var cid = $(containers[i]).children().attr("chartId");
                var id = $(containers[i]).children().attr("id");
                cids.push(cid);
                ids.push(id);

                grid.add_widget($('<div>'+
                    '<div class="grid-stack-item-content"' + 'id="'+ id + '"chartId="' + cid+ '">'+
                    '</div>'+
                    '</div>'),x, y, width, height);
            }

            $.ajax({
                type: 'POST',
                url: 'getShareOptions',
                data: 'cids='+cids,
                success: function(data){
                    for(var i=0;i<cids.length;i++){
                        var exportChart = engine.chart.init($("#"+ids[i])[0]);
                        exportChart.setOption(JSON.parse(data[i].jsCode));

                        // 图表初始化完成后添加菜单
                        $("#"+ids[i]).append('<div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">'+
                            '<span style="display:none;">'+
                            '<a href="#"><i class="glyphicon glyphicon-remove" style="color: white"></i></a>'+
                            '<a href="#" data-toggle="modal" data-target=".bs-option-modal-lg"><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>'+
                            '<a href="#"><i class="fa fa-cog" style="color: white"></i></a>'+
                            '</span>'+
                            '</div>');
                        $("#"+ids[i]).on('mouseenter mouseleave',function(e){
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
                        $("#"+ids[i]).find('a').eq(0).click(function(){
                            var area = $(this).parent().parent().parent();
                            $(area).parent().remove();
                        });

                        //将选中即将配置的图表渲染到配置面板
                        //双向绑定
                        $("#"+ids[i]).find('a').eq(1).click(function(){
                            var instance = engine.chart.getInstanceByDom($(this).parent().parent().parent()[0]);
                            var type = instance.getOption().series[0].type;

                            $("#loading").css("display","block");
                            $("#optionContainer").empty();
                            $("#optionPanel").empty();

                            $("#optionModal").on("shown.bs.modal",function(e) {
                                $("#loading").css("display","none");
                                if (type == "bar" || type == "line") {
                                    $("#optionPanel").html(formatData.tableAndConfigOfBarAndLine());
                                    ko.applyBindings(appViewModel.bindTableAndConfigOfBarAndLine(instance.getOption(), engine), $("#optionPanel").children()[1]);  //开启双向绑定监听
                                } else if (type == "pie") {
                                    $("#optionPanel").html(formatData.tableAndConfigOfPie());
                                    ko.applyBindings(appViewModel.bindTableAndConfigOfPie(instance.getOption(), engine), $("#optionPanel").children()[1]);  //开启双向绑定监听
                                }
                            });
                        });

                        $("#"+ids[i]).find('a').eq(2).click(function(){
                            $("title").html("Infovis-Designer");

                            $(".grid-stack-placeholder").remove();
                            $("#fill").parent().remove();

                            $(".app-container").addClass("loader");
                            $(".loader-container").css("display","block");

                            var index = $(this).parent().parent().parent().attr("chartId");
                            var arr = window.location.href.split("/");
                            var exportId = $("#exportId").val();
                            var shareHref = arr[0]+"//"+arr[2]+"/"+arr[3]+"/share.page?exportId="+exportId;
                            if(window.isSave == false) {
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
                                        top.window.location = "dataAnalysis.page?chartId=" + index;
                                    },
                                    error: function () {
                                        alert("保存失败，请重试！");
                                    }
                                });
                            }else{
                                top.window.location = "dataAnalysis.page?chartId=" + index;
                            }
                        });
                    }
                }
            });

            var domId;
            $("#optionModal").on("show.bs.modal",function(e){
                domId = e.relatedTarget.parentNode.parentNode.parentNode.getAttribute('id');
            });

            $(".modal-footer").eq(0).click(function(){
                var instance = engine.chart.getInstanceByDom(document.getElementById("optionContainer"));
                engine.chart.getInstanceByDom(document.getElementById(domId)).setOption(instance.getOption());
                $.ajax({
                   type: 'POST',
                   url: 'updateChartInfo',
                   data: {
                       'id': $("#"+domId).attr("chartId"),
                       'jsCode': JSON.stringify(instance.getOption())
                   },
                   error: function(){
                       alert("保存时失败，请重试!");
                   }
                });
            });

            // 关闭窗口时弹出确认提示
            $(window).bind('beforeunload', function(){
                // 只有在标识变量is_confirm不为false时，才弹出确认提示
                if(window.isSave == false)
                    return '您可能有数据没有保存';
            });
        })
    });