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
        "renderMenu" : 'app/renderMenu',
        "domReady" : 'lib/domReady',
        "zrender": "lib/zrender/zrender",
        "zrender/shape/Rectangle": "lib/zrender/zrender",
        "zrender/shape/Image": "lib/zrender/zrender",
        "zrender/tool/color": "lib/zrender/zrender",
        "zrender/Storage" : "lib/zrender/zrender",
        "CanvasTag" : "customModule/CanvasTag/CanvasTag",
        "CanvasTagOfImage" : "customModule/CanvasTag/CanvasTagOfImage",
        "confirmModal": "lib/confirm/confirm-bootstrap"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] },
        "confirmModal" : { "deps" :['jquery'] }
    },
    waitSeconds: 30
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
                $('.app-container').addClass(data.myPanel.backgroundClass);
            }else{
                $('.app-container').addClass('background-default');
            }
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

            var deferred = $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'myPanel/crud',
                data : {
                    exportId : $("#exportId").val(),
                    backgroundClass : targetClass
                },
                headers :{
                    oper : 'update'
                }
            });
        });
    });
});

require(['jquery', 'infovis', 'knockout', 'knockback', 'options', 'formatData', 'app/appViewModel', 'renderMenu','CanvasTag','confirmModal','zrender','CanvasTagOfImage',
        'bootstrap', 'gridstack', 'spectrum'],
    function($, infovis, ko, kb, baseOptions, formatData, appViewModel, renderMenu,CanvasTag,confirmModal,zrender,CanvasTagOfImage){
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
            $("#subGroupModal").find(".btn-success").click(function(){
                if($("[name='imgFile']").val() == ""){
                    $(".help-block").text("请先选择您要上传的控件背景图");
                }else{
                    $("#subGroupContainer").find(".loader-container").css("display", "block");
                    $.ajax({
                        type: 'POST',
                        url: 'imgToBase64',
                        data: new FormData($("#imgFile")[0]),
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function(data){
                            if(data.imgBase64 == "noFile"){
                                $(".help-block").text("请先选择您要上传的控件背景图");
                                $("#subGroupContainer").find(".loader-container").css("display", "none");
                            }else if(data.imgBase64 == "noImage"){
                                $(".help-block").text("请上传图片类型文件");
                                $("#subGroupContainer").find(".loader-container").css("display", "none");
                            }else{
                                $("#subGroupContainer").parent().prepend([
                                    '<img style="display: none" src=\'data:image/jpg;base64,'+data.imgBase64+'\' onerror="this.src=\'resources/img/white.jpg\'">'
                                ].join(""));
                                var canvasTagOfImage;
                                setTimeout(function(){                   //等待一秒保证新的节点已加入
                                    $("#subGroupContainer").find(".loader-container").css("display", "none");
                                    canvasTagOfImage = CanvasTagOfImage().render("subGroupContainer",$("#subGroupContainer").parent().find("img")[0]);
                                    $("#subGroupConfig").children().eq(1).html(formatData.tableAndConfigOfSubGroup());
                                    ko.cleanNode($("#subGroupConfig").children()[1]);     //解除之前的绑定
                                    ko.applyBindings(appViewModel.bindTableAndConfigOfSubGroup("subGroupContainer",canvasTagOfImage.getOption(),canvasTagOfImage),$("#subGroupConfig").children()[1]);
                                },500);
                                window.subGroupBase64 = data.imgBase64;
                            }
                        },
                        error: function(){
                            alert("上传失败，请重试！");
                        }
                    });
                }
            });
        });

        $(function(){
            window.getAllCharts = function(){
                $("#myChart").find(".row").html("");
                $("#mySubGroup").find(".row").html("");
                $.ajax({
                   type: 'POST',
                   url: 'selectChartInfo',
                   success: function(response){
                       for(var i=0;i<response.data.length;i++){
                           var dataType;
                           if(parseInt(response.data[i].isRealTime) == 0){
                               dataType = "引用当前数据库";
                           }else if(parseInt(response.data[i].isRealTime) == 1){
                               dataType = "实时获取";
                           }
                           if(response.data[i].chartType == 'pie'){
                               $("#myChart").find(".row").append('<div class="thumbnail" data-cid="'+response.data[i].id+'" style="width: 200px;height:150px;margin-left: 10px;float: left;position: relative"><img style="height: 100px" src="resources/img/pie_chart.png" alt="...">' +
                                   '<div class="arrow_top"></div><div class="glyphicon glyphicon-remove deleteOneChart"></div><div class="arrow_left"></div><div class="glyphicon glyphicon-ok"></div><p title="'+response.data[i].chartName+'">'+response.data[i].chartName+'&nbsp;&nbsp;&nbsp;&nbsp;<span class="dataType">'+dataType+'</span></p></div>');
                           }else if(response.data[i].chartType == 'line'){
                               $("#myChart").find(".row").append('<div class="thumbnail" data-cid="'+response.data[i].id+'" style="width: 200px;height:150px;margin-left: 10px;float: left;position: relative"><img style="height: 100px" src="resources/img/line_chart.png" alt="...">' +
                                   '<div class="arrow_top"></div><div class="glyphicon glyphicon-remove deleteOneChart"></div><div class="arrow_left"></div><div class="glyphicon glyphicon-ok"></div><p title="'+response.data[i].chartName+'">'+response.data[i].chartName+'&nbsp;&nbsp;&nbsp;&nbsp;<span class="dataType">'+dataType+'</span></p></div>');
                           }else if(response.data[i].chartType == 'bar'){
                               $("#myChart").find(".row").append('<div class="thumbnail" data-cid="'+response.data[i].id+'" style="width: 200px;height:150px;margin-left: 10px;float: left;position: relative"><img style="height: 100px" src="resources/img/bar_chart.png" alt="...">' +
                                   '<div class="arrow_top"></div><div class="glyphicon glyphicon-remove deleteOneChart"></div><div class="arrow_left"></div><div class="glyphicon glyphicon-ok"></div><p title="'+response.data[i].chartName+'">'+response.data[i].chartName+'&nbsp;&nbsp;&nbsp;&nbsp;<span class="dataType">'+dataType+'</span></p></div>');
                           }else if(response.data[i].chartType == 'ring'){
                               $("#myChart").find(".row").append('<div class="thumbnail" data-cid="'+response.data[i].id+'" style="width: 200px;height:150px;margin-left: 10px;float: left;position: relative"><img style="height: 100px" src="resources/img/ring_chart.png" alt="...">' +
                                   '<div class="arrow_top"></div><div class="glyphicon glyphicon-remove deleteOneChart"></div><div class="arrow_left"></div><div class="glyphicon glyphicon-ok"></div><p title="'+response.data[i].chartName+'">'+response.data[i].chartName+'&nbsp;&nbsp;&nbsp;&nbsp;<span class="dataType">'+dataType+'</span></p></div>');
                           }else if(response.data[i].chartType == 'text:subGroupOfImage'){
                               var imgBase64 = JSON.parse(response.data[i].jsCode).image;
                               $("#mySubGroup").find(".row").append('<div class="thumbnail" data-cid="'+response.data[i].id+'" style="width: 200px;height:150px;margin-left: 10px;float: left;position: relative"><img style="height: 100px" src=\'data:image/jpg;base64,'+imgBase64+'\' alt="...">' +
                                   '<div class="arrow_top"></div><div class="glyphicon glyphicon-remove deleteOneChart"></div><div class="arrow_left"></div><div class="glyphicon glyphicon-ok"></div><p><span class="dataType"></span></p></div>');
                           }
                       }
                       $(".thumbnail").click(function(){
                           if($(this).hasClass("selected")){
                               $(this).removeClass("selected");
                           }else{
                               $(this).addClass("selected");
                           }
                       });

                       /**
                        * 注册图表删除事件
                        */
                       $('.deleteOneChart').click(function (event) {
                           event.stopPropagation();//屏蔽父元素select样式选择
                       });
                       $('.deleteOneChart').confirmModal({
                           confirmTitle     : '提示',
                           confirmMessage   : '你确定删除该图表？',
                           confirmOk        : '是的',
                           confirmCancel    : '取消',
                           confirmDirection : 'rtl',
                           confirmStyle     : 'primary',
                           confirmCallback  : function (target) {
                               var cid = target.parent().attr('data-cid');
                               var deferred = $.ajax({
                                   type: 'POST',
                                   dataType: 'json',
                                   url: 'myChart/deleteOneChart',
                                   data : {
                                       "chartId": cid
                                   },
                                   headers :{
                                       oper : 'delete'
                                   }
                               });
                               deferred.done(function(data){
                                   if(data.isDelete == true){
                                       target.parent().remove();//当前面板的图表类型选择框删除
                                       $.each($('.grid-stack-item-content'),function (index,target) {//删除htmlcode中该图表的div元素
                                           if(cid == $(target).attr("chartid")){
                                               $(target).parent().remove();
                                           }
                                       });
                                   }else{
                                       alert("部分设计面板中使用了本图表，暂不可删除");
                                   }
                               })
                           },
                           confirmDismiss   : true,
                           confirmAutoOpen  : false
                       });
                   }
                });
            };
            window.getAllCharts();
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
                auto: false,
                vertical_margin: 0
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
                    '<div class="grid-stack-item-content" chartType="chart" ' + 'id="'+ order + '"chartId="' + cid+ '">'+
                    '</div>'+
                    '</div>'),node.x, node.y, node.width, node.height);
            };

            if(window.location.href.indexOf("chartId") > 0){
                var chartId = window.location.href.split("=")[2].replace("#","");
                var defer01 = $.ajax({
                    type: 'POST',
                    url: 'selectOneChartInfo',
                    data: "id="+chartId
                });
                defer01.done(function(data){
                    if(data && $('[chartId='+data.id+']').length <= 0) {
                        $("title").html("*Infovis-Designer");                                     //改动标记
                        window.isSave = false;

                        add_new_widget(0,0,data.id);
                        if(parseInt(data.isRealTime) == 0){
                            engine.chart.init($("#"+order)[0]).setOption(JSON.parse(data.jsCode));
                            renderMenu.renderMenu($("#"+order));
                            $("#"+order).find("#chartTitle").text(data.chartName);
                        }else if(parseInt(data.isRealTime) == 1){
                            $.ajax({
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                url: 'render',
                                data: JSON.stringify({
                                    'chartType': data.chartType,
                                    'dataRecordId': data.sqlRecordingId,
                                    'builderModel': JSON.parse(data.buildModel)
                                }),
                                success: function(option){
                                    engine.chart.init($("#"+order)[0]).setOption(option);
                                    renderMenu.renderMenu($("#"+order));
                                    $("#"+order).find("#chartTitle").text(data.chartName);
                                },
                                error: function(){
                                    $("#"+order).text("当前图表渲染失败，请检查数据库连接是否正常。");
                                    renderMenu.renderFailMenu($("#"+order));
                                }
                            });
                        }
                    }
                });
            }

            /**
             *
             * 图表，组件选中渲染方法
             * @param selects
             */
            var renderSelected = function(selects){
                if($(selects).hasClass("selected")){
                    var cid = $(selects).attr("data-cid");
                    var defer02 = $.ajax({
                        type: 'POST',
                        url: 'selectOneChartInfo',
                        data: "id=" + cid
                    });
                    defer02.done(function(data){
                        $("title").html("*Infovis-Designer");                                     //改动标记
                        window.isSave = false;
                        if(data.chartType.indexOf("subGroupOfImage") >= 0){
                            var imgBase64 = JSON.parse(data.jsCode).image;
                            var option = JSON.parse(data.jsCode);
                            order++;
                            grid.add_widget($('<div>'+
                                '<div class="grid-stack-item-content" chartType="text:subGroupOfImage" ' + 'id="'+ order + '"chartId="' + data.id+ '">'+
                                '</div>'+
                                '</div>'),0, 0,Math.ceil(option.width / 100), Math.ceil(option.height / 65));
                            $("#"+order).parent().append([
                                '<img style="display: none" src=\'data:image/jpg;base64,'+imgBase64+'\' >'
                            ].join(""));
                            option.image = $("#"+order).parent().find("img")[0];
                            CanvasTagOfImage().render(order,"",option);
                            renderMenu.renderMenu($("#"+order));
                        }else{
                            add_new_widget(0,0,data.id);
                            if(parseInt(data.isRealTime) == 0){
                                engine.chart.init($("#"+order)[0]).setOption(JSON.parse(data.jsCode));
                                renderMenu.renderMenu($("#"+order));
                                $("#"+order).find("#chartTitle").text(data.chartName);
                            }else if(parseInt(data.isRealTime) == 1){
                                $.ajax({
                                    async: false,
                                    type: 'POST',
                                    contentType: "application/json; charset=utf-8",
                                    url: 'render',
                                    data: JSON.stringify({
                                        'chartType': data.chartType,
                                        'dataRecordId': data.sqlRecordingId,
                                        'builderModel': JSON.parse(data.buildModel)
                                    }),
                                    success: function(option){
                                        var newOption = JSON.parse(data.jsCode);
                                        newOption.series = option.series;
                                        engine.chart.init($("#"+order)[0]).setOption(newOption);
                                        renderMenu.renderMenu($("#"+order));
                                        $("#"+order).find("#chartTitle").text(data.chartName);
                                    },
                                    error: function(){
                                        $("#"+order).text("当前图表渲染失败，请检查数据库连接是否正常。");
                                        renderMenu.renderFailMenu($("#"+order));
                                    }
                                });
                            }
                        }
                    });
                }
            };

            $("#myChart").find(".btn-primary").click(function(){
                $("#myChart").find(".thumbnail").each(function(){
                    renderSelected(this);
                });
                $("#myChart").modal('toggle');
            });

            $("#mySubGroup").find(".btn-primary").click(function(){
                $("#mySubGroup").find(".thumbnail").each(function(){
                    renderSelected(this);
                });
                $("#mySubGroup").modal('toggle');
                $("#mySubGroup").find(".thumbnail").removeClass("selected");
            });

            /**
             *
             * 保存并渲染自定义组建件到设计面板
             */
            $("#subGroupModal").find(".btn-primary").click(function(){
                if($("#subGroupContainer").attr("zid")){
                    var pzr = zrender.getInstance($("#subGroupContainer").attr("zid"));//原控件
                    var option = $.extend(true, {}, pzr.storage.getShapeList()[0].style);
                    option.image = window.subGroupBase64;
                    var deffer = $.ajax({
                        type: 'POST',
                        url: 'addCharts',
                        data : {
                            'chartType': "text:subGroupOfImage",
                            'sqlRecordingId': "0",
                            'buildModel': "",
                            'jsCode': JSON.stringify(option),
                            'chartName': "自定义组件"
                        }
                    });
                    deffer.done(function(result){
                        window.getAllCharts();      //自定义组件完成后需要即时更新已有组件库
                        order++;
                        grid.add_widget($('<div>'+
                            '<div class="grid-stack-item-content" chartType="text:subGroupOfImage" ' + 'id="'+ order + '"chartId="' + result+ '">'+
                            '</div>'+
                            '</div>'),0, 0,Math.ceil(option.width / 100), Math.ceil(option.height / 65));
                        $("#"+order).parent().append([
                            '<img style="display: none" src=\'data:image/jpg;base64,'+option.image+'\' >'
                        ].join(""));
                        option.image = $("#"+order).parent().find("img")[0];
                        CanvasTagOfImage().render(order,"",option);
                        renderMenu.renderMenu($("#"+order));
                    });
                }
                $("#subGroupModal").modal('toggle');
            });

            /**
             * 自适应容器变化
             */
            $(".grid-stack").on("resizestop",function(event,ui){
                $("title").html("*Infovis-Designer");                                     //改动标记
                window.isSave = false;
                //判断chart类型
                if(ui.element.find("div:eq(0)").attr("chartType").indexOf("text") >= 0){
                    if(ui.element.find("div:eq(0)").attr("chartType").indexOf("subGroup") <= 0){
                        var pzr = zrender.getInstance(ui.element.find("div:eq(0)").attr("zid"));//原控件
                        var option = $.extend(true, {}, pzr.storage.getShapeList()[0].style);
                        CanvasTag().render(ui.element.find("div:eq(0)").attr("id"),option);
                        renderMenu.renderMenu($("#" + ui.element.find("div:eq(0)").attr("id")));
                    }

                }else {
                    var id = ui.element[0].firstChild.getAttribute("id");
                    engine.chart.getInstanceByDom(document.getElementById(id)).resize();
                }
            });

            /**
             * 自适应窗口变化
             */
            window.addEventListener("resize", function () {
                $(".grid-stack-item-content").each(function(index,item){
                    if($(item).attr("chartType").indexOf("text") < 0){
                        engine.chart.getInstanceByDom(item).resize();
                    }
                });
            });

            $(".grid-stack").on("dragstop",function(event,ui){
                $("title").html("*Infovis-Designer");                                     //改动标记
                window.isSave = false;
            });

            /**
             * 保存当前设计面板
             */

            window.saveCurrentPanel = function () {
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
                    },
                    error : function(){
                        $(".app-container").removeClass("loader");
                        $(".loader-container").css("display","none");
                        alert("保存失败，请重试！");
                    }
                });

                var containers = $(".grid-stack").children();
                var chartIds = [];          //保存图表id
                var containerIds = [];           //保存容器id
                for(var i=0;i<containers.length;i++) {
                    var chartId = $(containers[i]).children().attr("chartId");
                    var containerId = $(containers[i]).children().attr("id");
                    chartIds.push(chartId);
                    containerIds.push(containerId);
                }
                
                $.ajax({
                   type: 'POST',
                   url: "panelChartsWrapper/updateWrapper",
                   data: "chartIds="+chartIds+"&containerIds="+containerIds+"&exportId="+exportId
                });
            };

            $("#exportHtml").click(function(){
                window.saveCurrentPanel();
            });

            // 为了防止再次进入以后设计面板时先前的图表不能自定义大小，这里获取先前图表的容器属性，重新添加容器并渲染图表
            var containers = $(".grid-stack").children();

            containers.remove();
            var cids = [];          //保存图表id
            var ids = [];           //保存容器id

            for(var i=0;i<containers.length-1;i++) {
                var x = $(containers[i]).attr("data-gs-x");
                var y = $(containers[i]).attr("data-gs-y");
                var width = $(containers[i]).attr("data-gs-width");
                var height = $(containers[i]).attr("data-gs-height");
                var cid = $(containers[i]).children().attr("chartId");
                var id = $(containers[i]).children().attr("id");
                var chartType = $(containers[i]).children().attr("chartType");
                cids.push(cid);
                ids.push(id);

                if(chartType.indexOf("text") < 0) {
                    grid.add_widget($('<div>' +
                        '<div class="grid-stack-item-content" chartType="chart" ' + 'id="' + id + '"chartId="' + cid + '">' +
                        '</div>' +
                        '</div>'), x, y, width, height);
                }else{
                    grid.add_widget($('<div>'+
                        '<div class="grid-stack-item-content" style="overflow: hidden;" chartType="' + chartType+ '" ' + 'id="'+ id + '"chartId="' + cid + '">'+
                        '</div>'+
                        '</div>'), x, y, width, height);
                }
            }

            var defer03 = $.ajax({
                type: 'POST',
                url: 'getShareOptions',
                data: 'cids='+cids
            });
            defer03.done(function(data){
                for(var i=0;i<cids.length;i++){
                    if(data[i].chartType.indexOf("text") < 0) {
                        var exportChart = engine.chart.init($("#" + ids[i])[0]);
                        if(parseInt(data[i].isRealTime) == 0){
                            exportChart.setOption(JSON.parse(data[i].jsCode));
                            renderMenu.renderMenu($("#"+ids[i]));
                            $("#"+ids[i]).find("#chartTitle").text(data[i].chartName);
                        }else if(parseInt(data[i].isRealTime) == 1){
                            $.ajax({
                                async: false,
                                type: 'POST',
                                contentType: "application/json; charset=utf-8",
                                url: 'render',
                                data: JSON.stringify({
                                    'chartType': data[i].chartType,
                                    'dataRecordId': data[i].sqlRecordingId,
                                    'builderModel': JSON.parse(data[i].buildModel)
                                }),
                                success: function(option){
                                    var newOption = JSON.parse(data[i].jsCode);        // 若本图表选择数据获取模式为实时获取，
                                    newOption.series = option.series;                  // 在渲染时将数据库中的option中的series部分替换为新生成的option的series部分即可
                                    exportChart.setOption(newOption);
                                    renderMenu.renderMenu($("#"+ids[i]));
                                    $("#"+ids[i]).find("#chartTitle").text(data[i].chartName);
                                },
                                error: function(){
                                    $("#" + ids[i]).text("当前图表渲染失败，请检查数据库连接是否正常。");
                                    renderMenu.renderFailMenu($("#" + ids[i]));
                                }
                            });
                        }
                    }else{
                        if(data[i].chartType.indexOf("subGroupOfImage") < 0) {
                            CanvasTag().render(ids[i],JSON.parse(data[i].jsCode));
                            renderMenu.renderMenu($("#"+ids[i]));
                        }else{
                            var imgBase64 = JSON.parse(data[i].jsCode).image;
                            var option = JSON.parse(data[i].jsCode);
                            $("#"+ids[i]).parent().append([
                                '<img style="display: none" src=\'data:image/jpg;base64,'+imgBase64+'\' >'
                            ].join(""));
                            option.image = $("#"+ids[i]).parent().find("img")[0];
                            CanvasTagOfImage().render(ids[i],"",option);
                            renderMenu.renderMenu($("#"+ids[i]));
                        }
                    }
                }
            });

            var domId;
            $("#optionModal").on("show.bs.modal",function(e){
                domId = e.relatedTarget.parentNode.parentNode.parentNode.getAttribute('id');
            });

            $("#optionModal").find(".btn-primary").click(function(){
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


            //左边拖动文本框业务逻辑
            $('.background-text-pick-block').draggable({
                cursor: "move",
                opacity: 0.7,
                appendTo :'body',
                helper: function (event) {
                    var target = $(this).clone();
                    target.zIndex( 100000000 );
                    target.css('position','absolute');
                    return target;
                }
            });
            $(".app-container").droppable({
                drop : function (event,ui) {
                    //屏蔽重复拖拽
                    if(ui.draggable.hasClass("background-text-pick-block")) {
                        addTextWidget(ui);
                        var canvasTag = CanvasTag().render(order);
                        renderMenu.renderMenu($("#" + order));
                        var deferred = $.ajax({
                            type: 'POST',
                            url: 'addCharts',
                            data : {
                                'chartType': "text:" + ui.draggable.find("span").attr('textType'),
                                'sqlRecordingId': "0",
                                'buildModel': "",
                                'jsCode': JSON.stringify(canvasTag.getOption()),
                                'chartName': "文字组件"
                            }
                        });
                        deferred.done(function(result){
                            $("#" + order).attr("chartId",result);
                        })
                    }
                }
            });
            
            var addTextWidget = function (ui) {
                order++;
                var pagex = (ui.position.left - 60) /  105;
                var pagey = (ui.position.top - 60+$(document).scrollTop()) /  70;
                var node = {
                    x: pagex,
                    y: pagey,
                    width: 3,
                    height: 1
                };

                //获取文字组件子类型
                var textType = ui.draggable.find("span").attr('textType');
                return grid.add_widget($('<div>'+
                    '<div class="grid-stack-item-content" style="overflow: hidden;" chartType="text:' + textType+ '" ' + 'id="'+ order + '">'+
                    '</div>'+
                    '</div>'),node.x, node.y, node.width, node.height);
            }
        });
    });