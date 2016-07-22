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
        "mapOfChina": "lib/map/china",
        "mapOfWorld": "lib/map/world",
        "mapOfXiangGang": "lib/map/xianggang",
        "knockout": "lib/knockout/knockout-3.4.0",
        "backbone": "lib/backbone/backbone-min",
        "underscore": "lib/underscore/underscore-min",
        "knockback": "lib/knockback.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['options', 'echarts', 'formatData',
         'jquery', 'exportHtml', 'knockout',
         'app/appViewModel', 'knockback', 'bootstrap', 'gridstack',
         'mapOfChina', 'mapOfWorld', 'mapOfXiangGang'],
    function(baseOptions, echarts, formatData, $, exportHtml,ko,appViewModel,kb){
    
    $(function(){  
        var options = {
            float: true
        };
        $('.grid-stack').gridstack(options);
              
        var order = 0;  //容器的顺序标记     
        (function() {   
            this.grid = $('.grid-stack').data('gridstack');
       
            this.add_new_widget = function () {  
                order++;
                var node = {
                            x: 0,
                            y: 0,
                            width: 3,
                            height: 3
                        };
                var nWidget = this.grid.add_widget($('<div>'+                                                        
                                                        '<div class="grid-stack-item-content"'+'order='+order+'>'+
                                                            '<a href="#" data-toggle="modal" data-target=".bs-example-modal-lg">'+
                                                                '<i class="glyphicon glyphicon-list-alt" style="font-size: 42px;margin-top:35%"></i>'+ 
                                                            '</a>'+
                                                        '</div>'+
                                                     '</div>'),
                    node.x, node.y, node.width, node.height); 
            }.bind(this);

            $('#add-new-widget').click(this.add_new_widget);
        }.bind({}))();    
        
        var container;
        $("#myModal").on('show.bs.modal', function (e) {
            container = e.relatedTarget.parentNode;
        });
               
        var exportOptions = [];                            //记录并保存每个图表的option并与容器对应
        $(".row").children().click(function(){
            if(container) {
                var index = $(container).attr("order");
                var myChart = echarts.init(container);
                var option;
                if(this.id=="bar01"){
                    option = baseOptions.makeBar01();
                }else if(this.id=="bar02"){
                    option = baseOptions.makeBar02();
                }else if(this.id=="bar03"){
                    option = baseOptions.makeBar03();
                }else if(this.id=="bar04"){
                    option = baseOptions.makeBar04();
                }else if(this.id=="line01"){
                    option = baseOptions.makeLine01();
                }else if(this.id=="line02"){
                    option = baseOptions.makeLine02();                    
                }else if(this.id=="line03"){
                    option = baseOptions.makeLine03();
                }else if(this.id=="pie01"){
                    option = baseOptions.makePie01();
                }else if(this.id=="pie02"){
                    option = baseOptions.makePie02();
                }else if(this.id=="pie03"){
                    option = baseOptions.makePie03();
                }else if(this.id=="pie04"){
                    option = baseOptions.makePie04();
                }else if(this.id=="pie05"){
                    option = baseOptions.makePie05();
                }else if(this.id=="map01"){
                    option = baseOptions.makeMap01();
                }else if(this.id=="map02"){
                    option = baseOptions.makeMap02();
                }else if(this.id=="map03"){
                    option = baseOptions.makeMap03();
                }else if(this.id=="map04"){
                    option = baseOptions.makeMap04();
                }else if(this.id=="scatter01"){
                    option = baseOptions.makeScatter01();
                }else if(this.id=="scatter02"){
                    option = baseOptions.makeScatter02();
                }else if(this.id=="scatter03"){
                    option = baseOptions.makeScatter03();
                }else if(this.id=="radar01"){
                    option = baseOptions.makeRadar01();
                }else if(this.id=="radar02"){
                    option = baseOptions.makeRadar02();
                }else if(this.id=="funnel01"){
                    option = baseOptions.makeFunnel01();
                }else if(this.id=="funnel02"){
                    option = baseOptions.makeFunnel02();
                }else if(this.id=="gauge01"){
                    option = baseOptions.makeGauge01();
                }
                myChart.setOption(option);
                exportOptions[index-1] = option;
                
                //图表初始化完成后添加菜单
                $(container).append('<div id="operate" style="width:100%;height:0px;background-color:rgb(52,73,94);position:absolute;top:0px;opacity:0.8">'+
                                        '<span style="display:none;">'+
                                        '<a href="javascript:void(0);"><i class="glyphicon glyphicon-remove"></i></a>'+
                                        '<a href="javascript:void(0);"><i class="glyphicon glyphicon-repeat"></i></a>'+
                                        '<a href="#" data-toggle="modal" data-target=".bs-option-modal-lg"><i class="glyphicon glyphicon-pencil"></i></a>'+
                                        '</span>'+    
                                    '</div>');               
                $(container).on('mouseenter mouseleave',function(e){
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
                $(container).find('a').eq(0).click(function(){
                    var area = $(this).parent().parent().parent().parent();
                    var index = $(area).attr("order");
                    for(var i=0,n=0;i<exportOptions.length;i++){
                        if(i!=(index-1)){
                            exportOptions[n++]=exportOptions[i];
                        }
                    }
                    $(area).remove();
                });               
                //初始化当前容器
                $(container).find('a').eq(1).click(function(){
                    var area = $(this).parent().parent().parent();
                    var index = $(area).attr("order");
                    $(area).empty();
                    $(area).append( '<a href="#" data-toggle="modal" data-target=".bs-example-modal-lg">'+
                                        '<i class="glyphicon glyphicon-list-alt" style="font-size:42px;margin-top:30%"></i>'+
                                    '</a>');
                    exportOptions[(index-1)] = {"baseOption":{}};            
                });
                //将选中即将配置的图表渲染到配置面板                
                $(container).find('a').eq(2).click(function(){
                    var instance  = echarts.getInstanceByDom($(this).parent().parent().parent()[0]);
                    // var optionChart = echarts.init(document.getElementById("optionContainer"));
                   
                    // optionChart.setOption(instance.getOption());
                    
                    var type = instance.getOption().series[0].type;
                    $("#data").children().eq(1).empty();

                    if(type=='bar'||type=='line'){
                        $("#data").children().eq(1).html(formatData.tableOfBar());
                        ko.applyBindings(appViewModel.bindTable(instance.getOption()),$("#data").children().eq(1).children()[0]);  //开启双向绑定监听
                    }else if(type=='pie'){
                        $("#data").children().eq(1).html(formatData.getDataOfPie(instance.getOption()));
                    }
                    
                });
                
                $(".grid-stack").on("resizestop",function(event,ui){
                    myChart.resize();                                                //自适应容器
                    window.addEventListener("resize",function(){
                        myChart.resize();                                            //自适应窗口
                    });
                });                                
            }
        });       
               
        //导出HTML
        $("#exportHtml").click(function(){
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
                                        '<div class="htmleaf-content bgcolor-3">'+
                                            '<div class="container-fluid">'+
                                                '<div class="grid-stack" id="exportContainer">'+
                                                    $(".grid-stack").html()+
                                                '</div>'+
                                            '</div>'+
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