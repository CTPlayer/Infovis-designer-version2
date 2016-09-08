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
        "infovis": "lib/infovis.min",
        "renderMenu" : 'app/renderMenu'
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery', 'infovis', 'knockout', 'knockback', 'options', 'formatData', 'app/appViewModel', 'renderMenu',
        'bootstrap', 'gridstack', 'spectrum'],
    function($, infovis, ko, kb, baseOptions, formatData, appViewModel, renderMenu){

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

            if(window.location.href.indexOf("chartId") > 0){
                var chartId = window.location.href.split("=")[2].replace("#","");
                $.ajax({
                   type: 'POST',
                   url: 'selectOneChartInfo',
                   data: "id="+chartId,
                   success: function(data){
                       $("title").html("*Infovis-Designer");                                     //改动标记
                       window.isSave = false;

                       add_new_widget(0,0,data.id);
                       engine.chart.init($("#"+order)[0]).setOption(JSON.parse(data.jsCode));

                       renderMenu.renderMenu($("#"+order));
                       $("#chartTitle").text(data.chartName);
                   } 
                });
            }

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

                                renderMenu.renderMenu($("#"+order));
                                $("#chartTitle").text(data.chartName);
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

            $(".grid-stack").on("dragstop",function(event,ui){
                $("title").html("*Infovis-Designer");                                     //改动标记
                window.isSave = false;
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

                        $(".app-container").removeClass("loader");
                        $(".loader-container").css("display","none");
                        // top.window.location = "query.page";
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

                        renderMenu.renderMenu($("#"+ids[i]));
                        $("#chartTitle").text(data[i].chartName);
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

            $('.background-color-pick-block span').click(function () {
                var target = $(this);
                var targetClass = target.attr("class");
                $.each(target.parent().siblings().find('span'),function (index,obj) {
                    var sibClass = $(obj).attr("class") || "";
                    if($('.app-container').hasClass(sibClass)){
                        $('.app-container').removeClass(sibClass);
                    }
                });
                $('.app-container').addClass(targetClass);
            });

        });
    });