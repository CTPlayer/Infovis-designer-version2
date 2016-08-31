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
            })
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
            window.isSave = true;   //记录页面是否有改动
            var options = {
                float: true,
                vertical_margin: 10
            };
            $('.grid-stack').gridstack(options);

            var order = 0;  //容器的顺序标记

            //给order赋值，用来在已有面板中继续添加图标时能接着前面已有图表的order顺序
            var containers = $(".grid-stack").children();
            for(var i=0;i<containers.length;i++){
                if($(containers[i]).children().first().attr("id")){
                    order = $(containers[i]).children().first().attr("id");
                }
            }

            var grid = $('.grid-stack').data('gridstack');

            var add_new_widget = function (pagex,pagey) {
                order++;
                var node = {
                    x: pagex,
                    y: pagey,
                    width: 4,
                    height: 4
                };
                var nWidget = grid.add_widget($('<div>'+
                    '<div class="grid-stack-item-content"'+'order="'+order+'" id="'+order+'">'+
                    '</div>'+
                    '</div>'),node.x, node.y, node.width, node.height);
            };

            //撑开可拖拽页面
            grid.add_widget($('<div style="display: none" id="fill">'+
                '<div class="grid-stack-item-content">'+
                '</div>'+
                '</div>'),0, 99, 0, 0);

            //为了防止再次进入以后设计面板时先前的图表不能自定义大小，这里获取先前图表的容器属性，重新添加容器并渲染图表
            var containers = $(".grid-stack").children();
            containers.remove();
            //每个已存在容器的y坐标需要单独获取
            var positionY = [];
            for(var i=0;i<containers.length-2;i++) {
                positionY.push($(containers[i]).attr("data-gs-y"));
            }
            for(var i=0;i<containers.length-2;i++) {
                var x = $(containers[i]).attr("data-gs-x");
                var y = positionY[i];
                var width = $(containers[i]).attr("data-gs-width");
                var height = $(containers[i]).attr("data-gs-height");
                var od = $(containers[i]).children().attr("order");

                grid.add_widget($('<div>'+
                    '<div class="grid-stack-item-content"'+'order="'+od+'" id="'+od+'">'+
                    '</div>'+
                    '</div>'),x, y, width, height);
            }

            //若该设计面板中原先有图表，则再次打开时需要获取他们的图表option
            if($("#exportOption").text().trim() != '' && $("#exportOption").text().trim() != null){
                var optionsArray = JSON.parse($("#exportOption").text());
            }else{
                var optionsArray = {};
            }

            var allOptions = baseOptions.makeAllOptions();
            var engine = infovis.init(allOptions || {});
            var currentIndex;                                        //记录当前所修改的option下标

            $(".side-menu").find("img").on("dragstart",function(ev){
                ev.originalEvent.dataTransfer.setData("Text",$(ev.target).parent().attr("id"));
            });

            $(".grid-stack").on("dragover",function(ev){
                ev.preventDefault();
            });

            $(".grid-stack").on("drop",function(ev){
                $("title").html("*Infovis-Designer");                         //改动标记
                window.isSave = false;
                ev.preventDefault();
                var data=ev.originalEvent.dataTransfer.getData("Text");
                var pagex = (ev.originalEvent.clientX - 60) /  105;
                var pagey = (ev.originalEvent.clientY - 60+$(document).scrollTop()) /  70;
                add_new_widget(pagex,pagey);
                var container = $("div[order = "+order+"]");
                var index = container.attr("order");
                if(engine){
                    if(data=="bar01"){
                        engine.render(order,"datasetOfBar","bar01");
                    }else if(data=="bar02"){
                        engine.render(order,"datasetOfBar","bar02");
                    }else if(data=="bar03"){
                        engine.render(order,"datasetOfBar","bar03");
                    }else if(data=="line01"){
                        engine.render(order,"datasetOfLine","line01");
                    }else if(data=="line02"){
                        engine.render(order,"datasetOfLine","line02");
                    }else if(data=="line03"){
                        engine.render(order,"datasetOfLine","line03");
                    }else if(data=="pie01"){
                        engine.render(order,"datasetOfPie","pie01");
                    }else if(data=="pie02"){
                        engine.render(order,"datasetOfPie","pie02");
                    }
                }

                if(optionsArray[order] == null)
                    optionsArray[order] = engine.chart.getInstanceByDom(document.getElementById(order)).getOption();

                // 图表初始化完成后添加菜单
                container.append('<div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">'+
                    '<span style="display:none;">'+
                    '<a href="#"><i class="glyphicon glyphicon-remove" style="color: white"></i></a>'+
                    '<a href="#" data-toggle="modal" data-target=".bs-option-modal-lg"><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>'+
                    '<a href="#"><i class="fa fa-cog" style="color: white"></i></a>'+
                    '</span>'+
                    '</div>');
                container.on('mouseenter mouseleave',function(e){
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
                container.find('a').eq(0).click(function(){
                    var area = $(this).parent().parent().parent();
                    var index = $(area).attr("order");

                    delete optionsArray[index];
                    $(area).parent().remove();
                });

                //将选中即将配置的图表渲染到配置面板
                //双向绑定
                container.find('a').eq(1).click(function(){
                    var instance = engine.chart.getInstanceByDom($(this).parent().parent().parent()[0]);
                    currentIndex = $(this).parent().parent().parent().attr("order");
                    var type = instance.getOption().series[0].type;

                    console.log(type);
                    console.log(instance.getOption());
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

                container.find('a').eq(2).click(function(){
                    $("title").html("Infovis-Designer");

                    $(".grid-stack-placeholder").remove();
                    $("#fill").remove();

                    $(".app-container").addClass("loader");
                    $(".loader-container").css("display","block");

                    var arr = window.location.href.split("/");
                    var exportId = $("#exportId").val();
                    var shareHref = arr[0]+"//"+arr[2]+"/"+arr[3]+"/share.page?exportId="+exportId;
                    if(window.isSave == false) {
                        $.ajax({
                            type: 'POST',
                            url: "export",
                            data: {
                                "htmlCode": $(".grid-stack").html().trim(),
                                "jsCode": JSON.stringify(optionsArray),
                                "exportId": exportId,
                                "extraMsg": shareHref
                            },
                            success: function () {
                                window.isSave = true;                     //点击导出后表明已保存

                                $("body").removeClass("loader");
                                $(".loader-container").css("display", "none");
                                top.window.location = "resources/dataAnalysis.html?exportId=" + exportId+"&order="+order;
                            },
                            error: function () {
                                alert("保存失败，请重试！");
                            }
                        });
                    }else{
                        top.window.location = "resources/dataAnalysis.html?exportId=" + exportId+"&order="+order;
                    }
                });

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

            $(".grid-stack").on("dragstop",function(event,ui){
                $("title").html("*Infovis-Designer");                                     //改动标记
                window.isSave = false;
            });

            var domId;
            $("#optionModal").on("show.bs.modal",function(e){
                domId = e.relatedTarget.parentNode.parentNode.parentNode.getAttribute('order');
            });

            $(".modal-footer").eq(0).click(function(){
                var instance = engine.chart.getInstanceByDom(document.getElementById("optionContainer"));
                engine.chart.getInstanceByDom(document.getElementById(domId)).setOption(instance.getOption());
                optionsArray[currentIndex] = instance.getOption();
            });

            $("#exportHtml").click(function(){
                $("title").html("Infovis-Designer");

                $(".grid-stack-placeholder").remove();
                $("#fill").remove();
                
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
                        "jsCode": JSON.stringify(optionsArray),
                        "exportId": exportId,
                        "extraMsg": shareHref
                    },
                    success : function(){
                        window.isSave = true;                     //点击导出后表明已保存

                        $("body").removeClass("loader");
                        $(".loader-container").css("display","none");
                        top.window.location = "query.page";
                    },
                    error : function(){
                        alert("保存失败，请重试！");
                    }
                });
            });

            /*********************************************************/
            //重新打开设计面板后渲染之前的图表
            var ids = [];
            var containers = $(".grid-stack").children();
            for(var i=0;i<containers.length;i++){
                if($(containers[i]).children().first().attr("id")){
                    ids.push($(containers[i]).children().first().attr("id"));
                }
            }

            for(var i=0;i<ids.length;i++){
                var exportChart = engine.chart.init(document.getElementById(ids[i]));
                exportChart.setOption( JSON.parse($("#exportOption").html())[ids[i]] )
            }

            var container = $("div[order]");
            for(var i=0;i<container.length;i++){
                $(container[i]).append('<div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">'+
                    '<span style="display:none;">'+
                    '<a href="#"><i class="glyphicon glyphicon-remove" style="color: white"></i></a>'+
                    '<a href="#" data-toggle="modal" data-target=".bs-option-modal-lg"><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>'+
                    '<a href="#"><i class="fa fa-cog" style="color: white"></i></a>'+
                    '</span>'+
                    '</div>');
                $(container[i]).on('mouseenter mouseleave',function(e){
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
                $(container[i]).find('a').eq(0).click(function(){
                    var area = $(this).parent().parent().parent();
                    var index = $(area).attr("order");

                    delete optionsArray[index];
                    $(area).parent().remove();
                });

                //将选中即将配置的图表渲染到配置面板
                //双向绑定
                $(container[i]).find('a').eq(1).click(function(){
                    var instance = engine.chart.getInstanceByDom($(this).parent().parent().parent()[0]);
                    currentIndex = $(this).parent().parent().parent().attr("order");
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

                $(container[i]).find('a').eq(2).click(function(){
                    $("title").html("Infovis-Designer");

                    var area = $(this).parent().parent().parent();
                    var index = $(area).attr("order");

                    $(".grid-stack-placeholder").remove();
                    $("#fill").remove();

                    $(".app-container").addClass("loader");
                    $(".loader-container").css("display","block");

                    var arr = window.location.href.split("/");
                    var exportId = $("#exportId").val();
                    var shareHref = arr[0]+"//"+arr[2]+"/"+arr[3]+"/share.page?exportId="+exportId;
                    if(window.isSave == false) {
                        $.ajax({
                            type: 'POST',
                            url: "export",
                            data: {
                                "htmlCode": $(".grid-stack").html().trim(),
                                "jsCode": JSON.stringify(optionsArray),
                                "exportId": exportId,
                                "extraMsg": shareHref
                            },
                            success: function () {
                                window.isSave = true;                     //点击导出后表明已保存

                                $("body").removeClass("loader");
                                $(".loader-container").css("display", "none");
                                top.window.location = "resources/dataAnalysis.html?exportId=" + exportId+"&order="+index;
                            },
                            error: function () {
                                alert("保存失败，请重试！");
                            }
                        });
                    }else{
                        top.window.location = "resources/dataAnalysis.html?exportId=" + exportId+"&order="+index;
                    }
                });
            }

            // 关闭窗口时弹出确认提示
            $(window).bind('beforeunload', function(){
                // 只有在标识变量is_confirm不为false时，才弹出确认提示
                if(window.isSave == false)
                    return '您可能有数据没有保存';
            });
        })
    });