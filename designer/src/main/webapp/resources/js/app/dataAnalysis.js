require.config({
    baseUrl: 'resources/js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "jquery-ui": "lib/jquery-ui.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "validate": "lib/jquery.validate.min",
        "metisMenu": "lib/metisMenu/metisMenu.min",
        "ztree": "lib/ztree/js/jquery.ztree.all.min",
        "options": "lib/charts/options",
        "infovis": "lib/infovis.min",
        "jqueryCookie": "lib/jquery.cookie",
        "jqueryMd5": "lib/jquery.md5",
        "mousewheel": 'lib/mCustomScrollbar/jquery.mousewheel.min',
        "scrollbar" : 'lib/mCustomScrollbar/jquery.mCustomScrollbar.min',
        "commonModule" : 'app/commonModule'
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "jquery-ui" : { "deps" :['jquery'] },
        "jqueryMd5" : { "deps" :['jquery'] },
        "metisMenu" : { "deps" :['jquery'] },
        "ztree" : { "deps" :['jquery'] }
    }
});

require(['jquery', 'options', 'infovis', 'validate'], function($, baseOptions, infovis, validate){
    $(function(){
        var engine = infovis.init(baseOptions.makeAllOptions() || {});
        var chartId = 0;              //chartId 对应myCharts表的主键，默认是0，即新建图表时，查询参数为0
        var exportId;                 //对应当前的设计面板
        if(window.location.href.indexOf("chartId") > 0){          //若通过点击设计面板中的表进入时，则chartId对应其在MyCharts表中的主键
            chartId = window.location.href.split("=")[1].replace("&exportId","");
            exportId = window.location.href.split("=")[2].replace("#","");
        }else{
            exportId = window.location.href.split("=")[1].replace("#","");
        }

        $(".backUp").prepend('<a href="showPanel.page?exportId=' + exportId + '"role="button"><button class="btn btn-info"><span class="glyphicon glyphicon-menu-left"></span> 返回</button></a>');

        var deferred = $.ajax({
            type: 'POST',
            url: 'selectOneChartInfo',
            data: "id="+chartId
        });
        deferred.done(function(data){
            if(data){
                var editChart = engine.chart.init(document.getElementById("editArea"));
                editChart.setOption(JSON.parse(data.jsCode));
                $("#addChartModal").find("input").val(data.chartName);
            }
        });

        $("#addChartModal .btn-success").click(function(){
            if(engine.chart.getInstanceByDom(document.getElementById("editArea"))){
                $("#addChartForm").submit();
            }else{
                alert("请先绘制图表");
            };
        });

        $("#addChartForm").validate({
            errorElement : 'div',
            errorClass : 'warning-block',
            focusInvalid : true,
            ignore : "",
            rules : {
                chartName : {
                    required : true,
                    maxlength:300
                }
            },
            messages : {
                chartName : {
                    required : "图表名称为必填项",
                    maxlength: "最大长度为50个字符"
                }
            },
            submitHandler : function(form){
                if(chartId == 0){
                    var deferred = $.ajax({
                        type: 'POST',
                        url: 'addCharts',
                        data : {
                            'chartType': engine.chart.getInstanceByDom(document.getElementById("editArea")).getOption().series[0].type,
                            'sqlRecordingId': window.sqlRecordingId,
                            'buildModel': JSON.stringify(window.bmodel),
                            'jsCode': JSON.stringify(engine.chart.getInstanceByDom(document.getElementById("editArea")).getOption()),
                            'chartName': $("#addChartForm").find("input").val()
                        }
                    });
                    deferred.done(function(data){
                        $(form)[0].reset();
                        $("#addChartModal").modal('toggle');
                        top.window.location = "showPanel.page?exportId="+exportId+"&chartId="+data;
                    })
                }else {
                    var deferred = $.ajax({
                        type: 'POST',
                        url: 'updateChartInfo',
                        data : {
                            'id': chartId,
                            'chartType': engine.chart.getInstanceByDom(document.getElementById("editArea")).getOption().series[0].type,
                            'sqlRecordingId': window.sqlRecordingId,
                            'buildModel': JSON.stringify(window.bmodel),
                            'jsCode': JSON.stringify(engine.chart.getInstanceByDom(document.getElementById("editArea")).getOption()),
                            'chartName': $("#addChartForm").find("input").val()
                        }
                    });
                    deferred.done(function(data){
                        $(form)[0].reset();
                        $("#addChartModal").modal('toggle');
                        top.window.location = "showPanel.page?exportId="+exportId;
                    })
                }
            }
        });

    })
});

require(['jquery','bootstrap','metisMenu'], function($){

    $(".dropdown").on('mouseenter mouseleave',function(e){
        if(e.type == 'mouseenter'){
            $(this).addClass("danger");
        }else if(e.type == 'mouseleave'){
            $(this).removeClass("danger");
        }
    });
    $('#side-menu').metisMenu({
        toggle: false
    });
});

require(['jquery','ztree','infovis','options', 'commonModule', 'mousewheel','scrollbar','jqueryCookie','jqueryMd5','bootstrap','jquery-ui'],
    function($,ztree,infovis,baseOptions,commonModule){
    var chartType = 'bar';      //图表类型,默认为柱状图
    var engine = infovis.init(baseOptions.makeAllOptions() || {});

    /**
     * 注册span选中后效果
     * @param target
     */
    var chartTypeSpanRegistry = function (target) {
        target.addClass('active');
        target.siblings().removeClass("active");
        if(target.hasClass("bar")){
            $('.chart-type-select-panel .drag-tips .tips-bar').show();
            $('.chart-type-select-panel .drag-tips .tips-bar').siblings().hide();
        }else if(target.hasClass('line')){
            $('.chart-type-select-panel .drag-tips .tips-line').show();
            $('.chart-type-select-panel .drag-tips .tips-line').siblings().hide();
        }else if(target.hasClass("pie")){
            $('.chart-type-select-panel .drag-tips .tips-pie').show();
            $('.chart-type-select-panel .drag-tips .tips-pie').siblings().hide();
        }
    }


    $(".chart-type").find("span").click(function(){
        if($(this).hasClass("bar")){
            chartType = 'bar';
        }else if($(this).hasClass('line')){
            chartType = 'line';
        }else if($(this).hasClass("pie")){
            chartType = 'pie';
        }
        chartTypeSpanRegistry($(this));
        chartTypeChangeTag(chartType);
    });


    /**重置全部标签内容**/
    var resetTagContent = function () {
        $('.xAxis').html('');
        $('.yAxis').html('');
        restoreTagStyle($('form.make-model-region .mark-item-color'));
        $('form.make-model-region .mark-item-color').html('<i class="fa fa-tachometer"></i> 颜色');
        restoreTagStyle($('form.make-model-region .mark-item-corner'));
        $('form.make-model-region .mark-item-corner').html('<i class="fa fa-clock-o"></i> 角度');
    }

    /**
     * 图表类型切换，标签相应切换
     */
    var chartTypeChangeTag = function (chartType) {
        var xAxisText = $('.xAxis span').text().trim() || '';
        var yAxisText = $('.yAxis span').text().trim() || '';
        var colorText = $('form.make-model-region .mark-item-color span').text().trim() || '';
        var cornerText = $('form.make-model-region .mark-item-corner span').text().trim() || '';
        if(chartType == 'pie'){
            if(xAxisText != ''){
                tagDropRender(xAxisText,'color',$("form.make-model-region .mark-down-column .mark-item-color"),'text',chartType);
                $('.xAxis').html('');
            }
            if(yAxisText != ''){
                tagDropRender(yAxisText,'corner',$("form.make-model-region .mark-down-column .mark-item-corner"),'number',chartType);
                $('.yAxis').html('');
            }
        }else  if(chartType == 'bar' || chartType == 'line'){
            if(colorText != ''){
                tagDropRender(colorText,'xAxis',$("form.make-model-region .xAxis"),'text',chartType);
                restoreTagStyle($('form.make-model-region .mark-item-color'));
                $('form.make-model-region .mark-item-color').html('<i class="fa fa-tachometer"></i> 颜色');
            }
            if(cornerText != ''){
                tagDropRender(cornerText,'yAxis',$("form.make-model-region .yAxis"),'number',chartType);
                restoreTagStyle($('form.make-model-region .mark-item-corner'));
                $('form.make-model-region .mark-item-corner').html('<i class="fa fa-clock-o"></i> 角度');
            }
        }
        if(window.sqlRecordingId){
            commonModule.renderChart(engine,chartType,window.sqlRecordingId);
        }
    }

    /**标记可接受数据类型(维度、度量)以及图表类型**/
    var axisTagMap = {
        "xAxis":{
            "dataType": "text",
            "line":true,
            "bar":true,
            "pie":false
        },
        "yAxis":{
            "dataType": "number",
            "line":true,
            "bar":true,
            "pie":false
        },
        "filter":{
            "dataType": "",
            "line":false,
            "bar":false,
            "pie":false
        },
        "color" :{
            "dataType": "text",
            "line":false,
            "bar":false,
            "pie":true
        },
        "corner" :{
            "dataType": "number",
            "line":false,
            "bar":false,
            "pie":true
        },
        "tag" : {
            "dataType": "",
            "line":false,
            "bar":false,
            "pie":false
        }
    }

    /*tag恢复样式*/
    var restoreTagStyle = function(target){
        target.css("background-color",'#ffffff');
        target.css("border",'none');
        target.css("border-right",'1px dashed #ccc');
    }

    /*
     标记tag被drop后样式渲染以及标记删除
     * */
    var appendMarkCellRender = function(tagType,target,targetText){
        target.html('');
        target.append(targetText);
        var dataType = axisTagMap[tagType].dataType;
        if(dataType == 'text'){
            target.css("background-color",'#f6eedb');
            target.css("border",'1px #f9e7bb solid');
        }
        if(dataType == 'number'){
            target.css("background-color",'#d2ddf0');
            target.css("border",'1px #b1caf4 solid');
        }
        target.css("cursor","move");

        /**
         * 绑定删除事件
         */
        $('form.make-model-region .mark-item-close').click(function(){
            var target = $(this);
            var isColorMark = target.parent().hasClass("mark-item-color");
            var isCornerMark = target.parent().hasClass("mark-item-corner");
            var isTagMark = target.parent().hasClass("mark-item-tag");

            if(isColorMark){//颜色tag删除
                restoreTagStyle(target.parent());
                target.parent().html('<i class="fa fa-tachometer"></i> 颜色');
            }else if(isCornerMark){//角度tag删除
                restoreTagStyle(target.parent());
                target.parent().html('<i class="fa fa-clock-o"></i> 角度');
            }else if(isTagMark){//标签tag删除
                target.parent().css("background-color",'#ffffff');
                target.parent().css("border",'none');
                target.parent().html('<i class="fa fa-tags"></i> 标签');
            }
            if(window.sqlRecordingId){
                commonModule.renderChart(engine,chartType,window.sqlRecordingId);
            }
        });
    };

    /**
     * 行、列数据渲染以及注册删除事件
     */
    var appendRowColCellRender = function(tagType,target,targetText){
        var dataType = axisTagMap[tagType].dataType;
        var textContent = '<div class="trigger-column-tag trigger-column-tag-text">'+
            '<a><i class="glyphicon glyphicon-text-color" style="display: none;"></i>'+
            '<span class="dragName">'+targetText+'</span><button type="button" class="close trigger-column-tag-close">&times;</button></a>'+
            '</div>';
        var numberContent = '<div class="trigger-column-tag trigger-column-tag-number">'+
            '<a><i class="fa fa-sort-numeric-asc" style="display: none;"></i>'+
            '<span class="dragName">'+targetText+'</span><button type="button" class="close trigger-column-tag-close">&times;</button></a>'+
            '</div>';
        if(dataType == 'number'){
            target.html(numberContent);
        }
        if(dataType == 'text'){
            target.html(textContent);
        }

        /**
         * 标记删除可拖动标签
         */
        $('.trigger-column-tag .trigger-column-tag-close').click(function(){
            var target = $(this).parent().parent();
            target.remove();
            if(window.sqlRecordingId){
                commonModule.renderChart(engine,chartType,window.sqlRecordingId);
            }
        });

    }

    /**获取tag图标class**/
    var getTagIclassType = function(tagType) {
        var iclass = '';
        switch(tagType)
        {
            case 'color':
                iclass = 'fa-tachometer';
                break;
            case 'corner':
                iclass = 'fa-clock-o';
                break;
            case 'tag':
                iclass = 'fa-tags';
                break;
            default:
                iclass = '';
        }
        return iclass;
    }


    /**
     * 标记drop渲染
     */
    var tagDropRender = function(targetNodeText,tagType,target,dragDataType,chartType) {
        var acceptDataType = axisTagMap[tagType].dataType;
        var isAcceptChartType = axisTagMap[tagType][chartType];
        var isRenderChart = false;
        var iclass = getTagIclassType(tagType);
        if((tagType == 'color' || tagType == 'corner') || tagType == 'tag'){
            if(acceptDataType == dragDataType && isAcceptChartType){
                var targetText = '<span style="width:100px;display: inline-block; overflow: hidden;">' +
                    '<i class="fa '+iclass+'" style="display: inline;"></i>&nbsp;'+targetNodeText+'</span>' +
                    '<button type="button" class="close mark-item-close">&times;</button>';
                appendMarkCellRender(tagType,target,targetText);
                isRenderChart = true;
            }else{
                restoreTagStyle(target);
            }
        }else{
            if(chartType == '' || ((acceptDataType == dragDataType)&&isAcceptChartType)){
                appendRowColCellRender(tagType,target,targetNodeText);
                isRenderChart = true;
            }
        }
        return isRenderChart;
    };

    /**
     * 标记拖拽OVER样式
     */
    var tagDropOverRender = function(chartType,tagType,target,dataType) {
        var acceptdataType = axisTagMap[tagType].dataType;
        var isAcceptChartType = axisTagMap[tagType][chartType];
        if(!isAcceptChartType || acceptdataType!= dataType){
            target.css("border","1px dashed #ff2828");
            target.css("background-color","#ffeeee");
        }else if(acceptdataType == dataType && isAcceptChartType){
            target.css("border","1px dashed #22a7f0");
            target.css("background-color","#cfe9f7");
        }
    };

    /*返回行、列、筛选标识*/
    var axisTagType = function(target){
        var isxAxis = target.hasClass("xAxis");
        var isyAxis = target.hasClass("yAxis");
        var isFilter = target.hasClass("column-filter");
        var tagType;
        if(isxAxis){
            tagType = 'xAxis';
        }else if(isyAxis){
            tagType = 'yAxis';
        }else if(isFilter){
            tagType = 'filter';
        }
        return tagType;
    };

    /*拖拽元素数据类型*/
    var dragUIDataType = function (ui) {
        var dragDataType;
        var textTag = $(ui.draggable).find("a").find("i").hasClass("glyphicon-text-color");
        var numberTag = $(ui.draggable).find("a").find("i").hasClass("fa-sort-numeric-asc");
        if(textTag){
            dragDataType = 'text';
        }else if(numberTag){
            dragDataType = 'number';
        }
        return dragDataType;
    }


    var firstLevelDeferred = $.Deferred();  //用于通知第一层树的加载
    var secondLevelDeferred = $.Deferred(); //用于通知第二层树的加载

    var setting_datalist = {
        async: {
            enable: true,
            url:"sqlRecordingManage/queryTree",
            autoParam:["queryParam", "level=lv"],
            dataType: "JSON",
            dataFilter: function(treeId, parentNode, responseData) {
                //批量增加iconSkin
                $.each(responseData,function(index,object){
                    if(object.type === 'database'){
                        switch(object.dbType)
                        {
                            case 'Oracle':
                                object.iconSkin = "oracleIcon";
                                break;
                            case 'MySql':
                                object.iconSkin = "mysqlIcon";
                                break;
                            case 'SqlServer':
                                object.iconSkin = "sqlserverIcon";
                                break;
                            case 'H2':
                                object.iconSkin = "h2Icon";
                                break;
                            default:
                                object.iconSkin = "dbIcon";
                        }

                    }else{
                        object.iconSkin = "tableIcon";
                    }
                });
                return responseData;
            }
        },
        data: {
            key: {
                name: "dbName"
            }
        },
        callback: {
            onAsyncError: function (event,treeId,treeNode,XMLHttpRequest,textStatus,errorThrown) {
                //记录旧的节点名称以免重复增加无法连接
                if(!treeNode.oldDbName){
                    treeNode.oldDbName = treeNode.dbName;
                }
                treeNode.dbName = treeNode.oldDbName +"(无法连接)"
                setting_datalist.updateNode(treeNode);
            },
            onAsyncSuccess :function () {
                $("div.leftScrollPanel").mCustomScrollbar({
                    autoHideScrollbar:true,
                    axis:"yx",
                    theme:"dark"
                });
                if(arguments[3][0].dbUrl){
                    firstLevelDeferred.resolve();
                }else{
                    secondLevelDeferred.resolve();
                }
            },
            onClick: function(event, treeId, treeNode){
                var tree = $.fn.zTree.getZTreeObj("dataListTree");
                var sqlRecordingId = tree.getSelectedNodes()[0].id;       //数据集id
                var engine = infovis.init(baseOptions.makeAllOptions() || {});    //图表渲染引擎
                if(window.sqlRecordingId && sqlRecordingId != window.sqlRecordingId){//数据源切换，重置标签
                    resetTagContent();
                }
                window.sqlRecordingId = sqlRecordingId;     //用于插入图表关联信息

                if(!treeNode.dbUrl) {
                    $('#side-menu li a:eq(0)').html("<i class='fa fa-sitemap fa-fw'></i>" + treeNode.dbName + "<span class='fa arrow'></span>");
                    var queryParam = {};
                    queryParam.id = treeNode.getParentNode().id;
                    queryParam.sql = treeNode.sql;
                    queryParam.queryMaxRows = 1;
                    queryParam.paging = false;
                    var deferred = $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: 'connectionManage/getQuerySqlInfo',
                        data : queryParam
                    });
                    deferred.done(function(result){
                        var columnModle = getCookieInfo(result).data;

                        $('#side-menu ul.nav.nav-third-level').empty();
                        $.each(columnModle.dimensions,function (index,element) {
                            $('#side-menu ul.nav.nav-third-level:eq(0)')
                                .append("<li><a href='javascript:void(0)'><i class='glyphicon glyphicon-text-color leftBarLiIcon'></i> <span style='display:inline-block;max-width: 120px;overflow: hidden;vertical-align:bottom'>" + element + "</span><i class='glyphicon glyphicon-download leftBarLiIcon pull-right' title='转换为度量'></i></a></li>");
                        });
                        $.each(columnModle.measure,function (index,element) {
                            $('#side-menu ul.nav.nav-third-level:eq(1)')
                                .append("<li><a href='javascript:void(0)'><i class='fa fa-sort-numeric-asc leftBarLiIcon'></i> <span style='display:inline-block;max-width: 120px;overflow: hidden;vertical-align:bottom'>" + element + "</span><i class='glyphicon glyphicon-upload leftBarLiIcon pull-right' title='转换为维度'></i></a></li>");
                        });
                        //切换维度度量事件绑定
                        $('#side-menu ul.nav.nav-third-level li i.leftBarLiIcon').on("click",function () {
                            var li = $($(this).parent().parent());
                            if($(this).hasClass("glyphicon-download")){
                                $(this).removeClass("glyphicon-download").addClass("glyphicon-upload");
                                li.find("i:not(.pull-right)").removeClass("glyphicon glyphicon-text-color").addClass("fa fa-sort-numeric-asc");
                                $('#side-menu ul.nav.nav-third-level:eq(1)').append(li);
                            }else{
                                $(this).removeClass("glyphicon-upload").addClass("glyphicon-download");
                                li.find("i:not(.pull-right)").removeClass("fa fa-sort-numeric-asc").addClass("glyphicon glyphicon-text-color");
                                $('#side-menu ul.nav.nav-third-level:eq(0)').append(li);
                            }
                            //移动后保存到cookie
                            saveCookieInfo(result);
                        })

                        //滚动条插件
                        $(".scrollable").mCustomScrollbar({
                            autoHideScrollbar:true,
                            theme:"dark"
                        });
                        /**
                         * 左侧维度、度量拖拽
                         */
                        $('#side-menu ul.nav.nav-third-level li').draggable({
                            cursor: "move",
                            opacity: 0.7,
                            appendTo :'body',
                            cursorAt: { top: 10, left: 34 },
                            helper: function(event) {
                                var dragText = $(this).find("a").find("span").html();
                                return $( "<div class='drag-helper'>"+dragText+"</div>" );
                            }
                        });

                        //在droppable事件中发送option组装请求
                        $("form.make-model-region .trigger-column").droppable({
                            drop: function (event, ui) {
                                var tagType = axisTagType($(this));
                                var targetNodeText = $(ui.draggable).find("a").find("span").html();
                                var isRenderChart = tagDropRender(targetNodeText,tagType,$(this),dragUIDataType(ui),chartType);
                                if(isRenderChart){
                                    commonModule.renderChart(engine,chartType,sqlRecordingId);
                                }
                                $(this).css("border","1px dashed #ccc");
                                $(this).css("background-color","white");
                            },
                            over: function (event, ui) {
                                var dragTextType = dragUIDataType(ui);
                                tagDropOverRender(chartType,axisTagType($(this)),$(this),dragTextType);
                            },
                            out:function (event,ui) {
                                $(this).css("border","1px dashed #ccc");
                                $(this).css("background-color","white");
                            }
                        });

                        /**
                         * 颜色tag
                         */
                        $("form.make-model-region .mark-down-column .mark-item-color").droppable({
                            drop: function(event,ui){
                                var targetNodeText = $(ui.draggable).find("a").find("span").html();
                                var isRenderChart = tagDropRender(targetNodeText,'color',$(this),dragUIDataType(ui),chartType);
                                if(isRenderChart){
                                    commonModule.renderChart(engine,chartType,sqlRecordingId);
                                }
                            },
                            over: function (event, ui) {
                                var dragTextType = dragUIDataType(ui);
                                tagDropOverRender(chartType,'color',$(this),dragTextType);
                            },
                            out:function (event,ui) {
                                $(this).css("border","");
                                $(this).css("background-color","white");
                            }
                        });

                        /**
                         * 角度tag
                         */
                        $("form.make-model-region .mark-down-column .mark-item-corner").droppable({
                            drop: function(event,ui){
                                var targetNodeText = $(ui.draggable).find("a").find("span").html();
                                var isRenderChart = tagDropRender(targetNodeText,'corner',$(this),dragUIDataType(ui),chartType);
                                if(isRenderChart){
                                    commonModule.renderChart(engine,chartType,sqlRecordingId);
                                }
                            },
                            over: function (event, ui) {
                                var dragTextType = dragUIDataType(ui);
                                tagDropOverRender(chartType,'corner',$(this),dragTextType);
                            },
                            out:function (event,ui) {
                                $(this).css("border","");
                                $(this).css("background-color","white");
                            }
                        });

                        /**
                         * 标签tag
                         */
                        $("form.make-model-region .mark-down-column .mark-item-tag").droppable({
                            drop: function(event,ui){
                                var targetNodeText = $(ui.draggable).find("a").find("span").html();
                                var isRenderChart = tagDropRender(targetNodeText,'tag',$(this),dragUIDataType(ui),chartType);
                                if(isRenderChart){
                                    commonModule.renderChart(engine,chartType,sqlRecordingId);
                                }
                            },
                            over: function (event, ui) {
                                var dragTextType = dragUIDataType(ui);
                                tagDropOverRender(chartType,'tag',$(this),dragTextType);
                            },
                            out:function (event,ui) {
                                $(this).css("border","");
                                $(this).css("background-color","white");
                            }
                        });

                    });
                }
            }
        }
    };
    var dataListTree = $.fn.zTree.init($("#dataListTree"),setting_datalist);

    //获取cookie中的维度与度量
    var getCookieInfo = function(res){
        var key = $.md5(JSON.stringify(res));
        var result;
        var cookieResult = $.cookie(key);
        if(cookieResult){
            result = {
                data : JSON.parse(cookieResult),
                type : 'cookie'
            }
        }else{
            //维度和度量模型
            var columnModle ={
                dimensions :[],
                measure :[],
            }
            $.each(res,function(index,element){
                if(element.type === 'varchar') {
                    columnModle.dimensions.push(element.name);
                }else{
                    columnModle.measure.push(element.name);
                }
            });
            result = {
                data : columnModle,
                type : 'ajax'
            }
            $.cookie(key,JSON.stringify(columnModle),{ expires: 10 });
        }
        return result
    }
    //将维度与度量保存到cookie
    var saveCookieInfo = function (result) {
        //维度和度量模型
        var columnModle ={
            dimensions :[],
            measure :[],
        }
        $.each($('#side-menu ul.nav.nav-third-level:eq(0) span'),function (index, element) {
            columnModle.dimensions.push($(element).text());
        })

        $.each($('#side-menu ul.nav.nav-third-level:eq(1) span'),function (index, element) {
            columnModle.measure.push($(element).text());
        })
        $.cookie($.md5(JSON.stringify(result)),JSON.stringify(columnModle),{ expires: 10 });
    }

    //页面数据绑定
    var chartId = 0;              //chartId 对应myCharts表的主键，默认是0，即新建图表时，查询参数为0
    if(window.location.href.indexOf("chartId") > 0){          //若通过点击设计面板中的表进入时，则chartId对应其在MyCharts表中的主键
        chartId = window.location.href.split("=")[1].replace("&exportId","");
    }else{//新建图表,默认bar
        chartTypeSpanRegistry($('.chart-type .bar'));
    }
    var binddefferd = $.ajax({
        type: 'POST',
        dataType: 'json',
        url: 'selectOneChartInfo',
        data: {
            'id': chartId
        }
    });

    //数据绑定部分
    binddefferd.done(function (result) {
        var buildModel = JSON.parse(result.buildModel);
        if(buildModel.mark){//pie
            if(buildModel.mark.color) {
                tagDropRender(buildModel.mark.color,'color',$("form.make-model-region .mark-down-column .mark-item-color"),'text','pie');
            }
            if(buildModel.mark.angle){
                tagDropRender(buildModel.mark.angle,'corner',$("form.make-model-region .mark-down-column .mark-item-corner"),'number','pie');
            }
        }
        if(buildModel.xAxis){
            tagDropRender(buildModel.xAxis,'xAxis',$("form.make-model-region .xAxis"),'text','');
        }

        if(buildModel.yAxis){
            tagDropRender(buildModel.yAxis,'yAxis',$("form.make-model-region .yAxis"),'number','');
        }
        window.sqlRecordingId = result.sqlRecordingId;
        if(result.chartType){
            chartType = result.chartType;
            switch (result.chartType){
                case 'pie':
                    chartTypeSpanRegistry($('.chart-type .pie'));
                    break;
                case 'bar':
                    chartTypeSpanRegistry($('.chart-type .bar'));
                    break;
                case 'line':
                    chartTypeSpanRegistry($('.chart-type .line'));
                    break;
                default:
                    break;
            };
        }
    });

    //查询父级节点id
    binddefferd.done(function (result) {
        var parentNode;
        var treeObj = $.fn.zTree.getZTreeObj("dataListTree");

        var queryParentDeferred = $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'sqlRecordingManage/query',
            data: {
                'id': result.sqlRecordingId
            }
        });

        queryParentDeferred.done(function (v) {
            parentNode = treeObj.getNodesByFilter(function (node) {
                return (node.id == v[0].connectionId && node.dbUrl);
            }, true); // 仅查找一个节点
            treeObj.expandNode(parentNode, true, true, true);
        })

        //当树第一层第二层加载好时执行以下逻辑
        $.when(firstLevelDeferred,secondLevelDeferred).done(function (v1, v2) {
            var childNode = treeObj.getNodesByFilter(function (node) {
                return node.id == result.sqlRecordingId;
            }, true, parentNode); // 仅查找一个节点
            treeObj.selectNode(childNode);
            treeObj.setting.callback.onClick(null,"dataListTree",childNode)
        })
    })
});
