require.config({
    baseUrl: 'js',
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
        "jqueryMd5": "lib/jquery.md5"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "jquery-ui" : { "deps" :['jquery'] },
        "jqueryMd5" : { "deps" :['jquery'] },
        "metisMenu" : { "deps" :['jquery'] },
        "ztree" : { "deps" :['jquery'] }
    }
});

require(['jquery', 'options', 'infovis'], function($, baseOptions, infovis){
    $(function(){
        var engine = infovis.init(baseOptions.makeAllOptions() || {});
        var exportId = window.location.href.split("=")[1].replace("&order","");
        var order = window.location.href.split("=")[2].replace("#","");
        $.ajax({
            type: 'POST',
            url: '../getOptions',
            data: "exportId="+exportId,
            success: function(data){
                var editChart = engine.chart.init(document.getElementById("editArea"));
                editChart.setOption(JSON.parse(data["jsCode"])[order]);
            },
            error: function(){
                alert("图表配置加载失败，请重试");
            }
        });
    })
});

require(['jquery','validate','jquery-ui','bootstrap','metisMenu'], function($,jqueryui,validate){

    $(".thumbnail").on('mouseenter mouseleave',function(e){
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

//数据集操作模块
require(['jquery','ztree','jqueryCookie','jqueryMd5','bootstrap'], function($,ztree){
    function tagDropFunction(event, ui,iclass,target) {
        var targetNode = $(ui.draggable).find("a").find("span").html();
        var numberTag = $(ui.draggable).find("a").find("i").hasClass("fa-sort-numeric-asc");
        var textTag = $(ui.draggable).find("a").find("i").hasClass("glyphicon-text-color");
        target.html('');
        var targetText = '<i class="'+iclass+'"></i> <span>'+targetNode+'</span>';
        target.append(targetText);
        if(textTag){
            target.css("background-color",'#f6eedb');
            target.css("border",'1px #f9e7bb solid');
        }
        if(numberTag){
            target.css("background-color",'#d2ddf0');
            target.css("border",'1px #b1caf4 solid');
        }
    };

    var setting_datalist = {
        async: {
            enable: true,
            url:"../sqlRecordingManage/queryTree",
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
            onClick: function(event, treeId, treeNode){
                if(!treeNode.dbUrl) {
                    $('#side-menu li a:eq(0)').html("<i class='fa fa-sitemap fa-fw'></i>" + treeNode.dbName + "<span class='fa arrow'></span>");
                    var queryParam = {};
                    queryParam.id = treeNode.id;
                    queryParam.sql = treeNode.sql;
                    queryParam.queryMaxRows = 1;
                    queryParam.paging = false;
                    var deferred = $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: '../connectionManage/getQuerySqlInfo',
                        data : queryParam
                    });
                    deferred.done(function(result){
                        var columnModle = getCookieInfo(result).data;

                        $('#side-menu ul.nav.nav-third-level').empty();
                        $.each(columnModle.dimensions,function (index,element) {
                            $('#side-menu ul.nav.nav-third-level:eq(0)')
                                .append("<li><a href='javascript:void(0)'><i class='glyphicon glyphicon-text-color leftBarLiIcon'></i><span style='display:inline-block;max-width: 150px;overflow: hidden;'>" + element + "</span><i class='glyphicon glyphicon-download leftBarLiIcon pull-right'></i></a></li>");
                        });
                        $.each(columnModle.measure,function (index,element) {
                            $('#side-menu ul.nav.nav-third-level:eq(1)')
                                .append("<li><a href='javascript:void(0)'><i class='fa fa-sort-numeric-asc leftBarLiIcon'></i><span style='display:inline-block;max-width: 10px;max-width: 150px;overflow: hidden;'>" + element + "</span><i class='glyphicon glyphicon-upload leftBarLiIcon pull-right'></i></a></li>");
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

                        $('#side-menu ul.nav.nav-third-level li').draggable({
                            cursor: "move",
                            opacity: 0.7,
                            cursorAt: { top: -12, left: -12 },
                            helper: function(event) {
                                var dragText = $(this).find("a").find("span").html();
                                return $( "<div style='white-space:nowrap;border:1px #22a7f0 solid;padding:4px;'>"+dragText+"</div>" );
                            }
                        });

                        $("form.make-model-region .trigger-column").droppable({
                            drop: function (event, ui) {
                                var targetNode = $(ui.draggable).find("a").find("span").html();
                                var numberTag = $(ui.draggable).find("a").find("i").hasClass("fa-sort-numeric-asc");
                                var textTag = $(ui.draggable).find("a").find("i").hasClass("glyphicon-text-color");

                                var targetText = '<div class="trigger-column-tag" style="overflow:hidden;text-overflow:ellipsis;background-color:#f6eedb;" >'+
                                    '<span class="dragName">'+targetNode+'</span>'+
                                    '<span></span>'+
                                    '</div>';
                                var targetNumberText = '<div class="trigger-column-tag" style="overflow:hidden;text-overflow:ellipsis;background-color: #d2ddf0;border:1px solid #b1caf4" >'+
                                    '<span class="dragName">'+targetNode+'</span>'+
                                    '<span></span>'+
                                    '</div>';
                                var target = $(this);

                                if(numberTag){
                                    target.append(targetNumberText);
                                }
                                if(textTag){
                                    target.append(targetText);
                                }
                            }
                        });

                        $("form.make-model-region .mark-down-column .mark-item-color").droppable({
                            drop: function(event,ui){
                                var target = $(this);
                                tagDropFunction(event,ui,'fa fa-tachometer',target)
                            }
                        });

                        $("form.make-model-region .mark-down-column .mark-item-size").droppable({
                            drop: function(event,ui){
                                var target = $(this);
                                tagDropFunction(event,ui,'glyphicon glyphicon-zoom-in',target)
                            }
                        });

                        $("form.make-model-region .mark-down-column .mark-item-tag").droppable({
                            drop: function(event,ui){
                                var target = $(this);
                                tagDropFunction(event,ui,'fa fa-tags',target)
                            }
                        });

                        $("form.make-model-region .mark-down-column .mark-item-desc").droppable({
                            drop: function(event,ui){
                                var target = $(this);
                                tagDropFunction(event,ui,'fa fa-file-text-o',target)
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
        var key = $.md5(res);
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
        $.cookie($.md5(result),JSON.stringify(columnModle),{ expires: 10 });
    }

    $("form.make-model-region .trigger-column").on('mouseenter mouseleave',function(e){
        var target = $(this);
        if(e.type == 'mouseenter'){
            if(target.html()!=''){
                target.css("height","auto");
            }
            target.css("cursor","pointer");
        }else if(e.type == 'mouseleave'){
            target.css("height","28px");
        }
    });

});