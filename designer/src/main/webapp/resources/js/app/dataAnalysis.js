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
        "infovis": "lib/infovis.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "jquery-ui" : { "deps" :['jquery'] },
        "metisMenu" : { "deps" :['jquery'] },
        "ztree" : { "deps" :['jquery'] }
    }
});

require(['jquery', 'options', 'infovis'], function($, baseOptions, infovis){
    $(function(){
        var engine = infovis.init(baseOptions.makeAllOptions() || {});
        var exportId = window.location.href.split("=")[1].replace("&order","");
        var order = window.location.href.split("=")[2];
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
require(['jquery','ztree','bootstrap'], function($,ztree){
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
                        url: '../connectionManage/executeQuerySql',
                        data : queryParam
                    });
                    deferred.done(function(result){
                        $('#side-menu ul.nav.nav-third-level').empty();
                        $.each(result.data[0],function(index,element){
                            $('#side-menu ul.nav.nav-third-level:eq(0)').append("<li><a href='#'><i class='glyphicon glyphicon-text-color leftBarLiIcon'></i><span>"+element+"</span></a></li>");
                        });
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
                                var targetText = '<div class="trigger-column-tag" style="overflow:hidden;text-overflow:ellipsis;" >'+
                                    '<span class="dragName">'+targetNode+'</span>'+
                                    '<span></span>'+
                                    '</div>';
                                var target = $(this);
                                target.append(targetText);
                            }
                        });

                    });
                }
            }
        }
    };

    var dataListTree = $.fn.zTree.init($("#dataListTree"),setting_datalist);

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