require.config({
    baseUrl: 'js',
    paths: {
        "options": "lib/charts/options",           //图表初始option配置文件
        "echarts": "lib/charts/echarts",    
        "formatData": "lib/charts/formatData",        //数据格式化文件
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "jquery-ui": "lib/jquery-ui.min",
        "lodash": "lib/gridstack/js/lodash.min",
        "gridstack": "lib/gridstack/js/gridstack.min",
        "exportHtml": "lib/export/exportHtml",
        "knockout": "lib/knockout/knockout-3.4.0",
        "backbone": "lib/backbone/backbone-min",
        "underscore": "lib/underscore/underscore-min",
        "knockback": "lib/knockback.min",
        "bootsnav": "lib/bootstrap/js/bootsnav",
        "spectrum": "lib/bootstrap/js/spectrum",
        "infovis": "lib/infovis.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery', 'infovis', 'knockout', 'knockback', 'options', 'formatData', 'exportHtml', 'app/appViewModel',
         'bootstrap', 'gridstack', 'bootsnav', 'spectrum'],
    function($, infovis, ko, kb, baseOptions, formatData, exportHtml, appViewModel){

    $(function(){
        var options = {
            float: true,
            vertical_margin: 10
        };
        $('.grid-stack').gridstack(options);
              
        var order = 0;  //容器的顺序标记     
        var grid = $('.grid-stack').data('gridstack');

        var add_new_widget = function (pagex,pagey) {
            order++;
            var node = {
                x: pagex,
                y: pagey,
                width: 3,
                height: 3
            };
            var nWidget = grid.add_widget($('<div>'+
                    '<div class="grid-stack-item-content"'+'order="'+order+'" id="'+order+'">'+
                    '</div>'+
                    '</div>'),node.x, node.y, node.width, node.height);
        }

        grid.add_widget($('<div style="display: none">'+
                '<div class="grid-stack-item-content">'+
                '</div>'+
                '</div>'),0, 0, 0, 10);

        var exportOptions = [];                            //记录并保存每个图表的option并与容器对应
        var allOptions = baseOptions.makeAllOptions();
        var engine = infovis.init(allOptions || {});
        var currentIndex;                                        //记录当前所修改的option下标

        $(".side").find("img").on("dragstart",function(ev){
            ev.originalEvent.dataTransfer.setData("Text",$(ev.target).parent().attr("id"));
        });

        $(".grid-stack").on("dragover",function(ev){
            ev.preventDefault();
        });


        $(".grid-stack").on("drop",function(ev){
            ev.preventDefault();
            var data=ev.originalEvent.dataTransfer.getData("Text");
            var pagex = (ev.originalEvent.clientX - 280) /  105;
            var pagey = (ev.originalEvent.clientY - 118+$(document).scrollTop()) /  70;
            add_new_widget(pagex,Math.floor(pagey));
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

            exportOptions[index-1] = engine.chart.getInstanceByDom(document.getElementById(order)).getOption();

            // 图表初始化完成后添加菜单
            container.append('<div id="operate" style="width:100%;height:0px;background-color:rgb(52,73,94);position:absolute;top:0px;opacity:0.8">'+
                                    '<span style="display:none;">'+
                                    '<a href="#"><i class="glyphicon glyphicon-remove"></i></a>'+
                                    '<a href="#" data-toggle="modal" data-target=".bs-option-modal-lg"><i class="glyphicon glyphicon-pencil"></i></a>'+
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
                for(var i=0,n=0;i<exportOptions.length;i++){
                    if(i!=(index-1)){
                        exportOptions[n++]=exportOptions[i];
                    }
                }
                $(area).parent().remove();
            });

            //将选中即将配置的图表渲染到配置面板
            //双向绑定
            container.find('a').eq(1).click(function(){
                var instance = engine.chart.getInstanceByDom($(this).parent().parent().parent()[0]);
                currentIndex = $(this).parent().parent().parent().attr("order");
                $("#optionPanel").html(formatData.tableAndConfig());
                ko.applyBindings(appViewModel.bindTableAndConfig(instance.getOption(),engine),$("#optionPanel").children()[1]);  //开启双向绑定监听
            });

            $(".grid-stack").on("resizestop",function(event,ui){
                for(var i=1;i<=order;i++){
                    engine.chart.getInstanceByDom(document.getElementById(i)).resize();
                }
                window.addEventListener("resize",function(){
                    for(var i=1;i<=order;i++){
                        engine.chart.getInstanceByDom(document.getElementById(i)).resize();
                    }
                });
            });
        });

        var domId;
        $("#optionModal").on("show.bs.modal",function(e){
            domId = e.relatedTarget.parentNode.parentNode.parentNode.getAttribute('order');
        });

        $(".modal-footer").click(function(){
            var instance = engine.chart.getInstanceByDom(document.getElementById("optionContainer"));
            engine.chart.getInstanceByDom(document.getElementById(domId)).setOption(instance.getOption());
            exportOptions[currentIndex-1] = instance.getOption();
        });

        //导出HTML
        $("#exportHtml").click(function(){
            $(".grid-stack").children(":first").remove();
            $(".grid-stack").children(":first").remove();
            var template = '<!DOCTYPE html>'+
                            '<html lang="zh-CN">'+
                               '<head>'+
                                   '<meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content=""><meta name="author" content="">'+
                                   '<title>报表</title>'+
                                   '<link href="css/bootstrap.min.css" rel="stylesheet"><link rel="stylesheet" href="css/gridstack.css"/><link rel="stylesheet" type="text/css" href="css/default.css">'+
                                   '<style type="text/css">'+
                                        '.grid-stack {'+
                                            'border : 1px solid rgb(200,200,200)'+
                                        '}'+                                          
                                    '</style>'+
                                '</head>'+
                                '<body>'+
                                    '<div class="container"style="margin-top:50px;">'+
                                        '<div class="grid-stack" id="exportContainer">'+
                                            $(".grid-stack").html()+
                                        '</div>'+
                                    '</div>'+
                                    '<div id="exportOption" style="display:none">'+
                                        JSON.stringify(exportOptions)+
                                    '</div>'+
                                    '<script src="require.js" defer async="true" data-main="exportmain"></script>'+
                                '</body>'+
                            '</html>'
            exportHtml.downloadHtml(template);
        });          
    })
});