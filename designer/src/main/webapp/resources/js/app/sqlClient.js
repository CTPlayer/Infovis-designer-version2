require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "jquery-ui": "lib/jquery-ui.min",
        "jquery-layout": "lib/jquery.layout.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "ztree": "lib/ztree/js/jquery.ztree.all.min",
        "validate": "lib/jquery.validate.min",
        "knockout": "lib/knockout/knockout-3.4.0",
        "backbone": "lib/backbone/backbone-min",
        "knockback": "lib/knockback.min",
        "underscore": "lib/underscore/underscore-min"
    },
    shim : {
        "ztree" : { "deps" :['jquery'] },
        "jquery-ui" : { "deps" :['jquery'] },
        "jquery-layout" : { "deps" :['jquery','jquery-ui'] },
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery','bootstrap','jquery-ui','jquery-layout','ztree','validate','knockout','backbone','knockback'],function($,bootstrap,jquery_ui,jquery_ayout,ztree,validate,ko,bo,kb){
    $(function(){
        var outerLayout = $('body').layout({
            center__paneSelector:	".outer-center"
            ,	west__paneSelector:		".outer-west"
            ,	east__paneSelector:		".outer-east"
            ,	west__size:				200
            ,	east__size:				125
            ,	spacing_open:			8 // ALL panes
            ,	spacing_closed:			12 // ALL panes
            ,	north__spacing_open:	0
            ,	south__spacing_open:	0
        });

        var middleLayout = $('div.outer-center').layout({
            center__paneSelector:	".middle-center"
            ,	west__paneSelector:		".middle-west"
            ,	east__paneSelector:		".middle-east"
            ,	west__size:				100
            ,	east__size:				100
            ,	spacing_open:			8  // ALL panes
            ,	spacing_closed:			12 // ALL panes
        });

        var innerLayout = $('div.middle-center').layout({
            center__paneSelector:	".inner-center"
            ,	north__size:		    200
            ,	spacing_open:			8  // ALL panes
            ,	spacing_closed:			8  // ALL panes
            ,	north__spacing_closed:	12
        });

        var setting = {
            async: {
                enable: true,
                url:"../connectionManage/queryTree",
                autoParam:["queryParam", "level=lv"],
                dataType: "JSON",
                dataFilter: function(treeId, parentNode, responseData) {
                    //批量增加iconSkin
                    $.each(responseData,function(index,object){
                        if(object.dbUrl){
                            object.iconSkin = "dbIcon";
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
                    dataSourceTree.updateNode(treeNode);
                },
                onClick: function(event, treeId, treeNode) {
                    if(!treeNode.isParent){
                        var sql = $("#executeSql").val();
                        if(sql === ''){
                            $("#executeSql").val("select * from " + treeNode.dbName);
                        }else{
                            $("#executeSql").val(sql + " " + treeNode.dbName);
                        }
                    }
                }
            }
        };

        var dataSourceTree = $.fn.zTree.init($("#dataSourceTree"),setting);


        //删除
        $("#deleteDB").click(function(){
            var nodes = dataSourceTree.getSelectedNodes();
            if(nodes.length != 1){
                $("#isCheckModal").modal('toggle');
            }else if(!nodes[0].dbUrl){
                $("#onlyDBModal").modal('toggle');
            }else{
                $("#isDeleteModal").modal('toggle');
            }
        })
        //确认删除
        $("#isDeleteModal .btn-primary").click(function(){
            var nodes = dataSourceTree.getSelectedNodes();
            var deferred = $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '../connectionManage/delete',
                data : 'id=' + nodes[0].id
            });
            $("#isDeleteModal").modal('toggle');
            deferred.done(function(){
                dataSourceTree.reAsyncChildNodes(null, "refresh");
            })

        });

        //新增保存
        $("#addConnectionModal .btn-primary").click(function(){
            $('#addConnectionForm').submit();
        })

        $('#addConnectionForm').validate({
            errorElement : 'div',
            errorClass : 'warning-block',
            focusInvalid : true,
            ignore : "",
            rules : {
                dbType : {
                    required : true
                },
                dbHost : {
                    required : true,
                },
                dbPort : {
                    required : true,
                },
                dbName : {
                    required : true,
                    maxlength:300
                },
                dbUrl : {
                    required : true,
                    maxlength:300
                },
                userName : {
                    required : true,
                    maxlength:300
                },
                password : {
                    required : true,
                    maxlength:300
                }
            },
            messages : {
                dbType : {
                    required : "数据库连接地址为必选项"
                },
                dbHost : {
                    required : "数据库主机地址为必填项",
                },
                dbPort : {
                    required : "数据库端口号为必填项",
                },
                dbName : {
                    required : "数据库名称地址为必填项",
                    maxlength: "最大长度为300个字符"
                },
                dbUrl : {
                    required : "数据库连接地址为必填项",
                    maxlength:"最大长度为300个字符"
                },
                userName : {
                    required : "数据库用户名为必填项",
                    maxlength:"最大长度为300个字符"
                },
                password : {
                    required : "数据库密码地址为必填项",
                    maxlength:"最大长度为300个字符"
                }
            },
            submitHandler : function(form) {
                var deferred = $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '../connectionManage/add',
                    data : $(form).serialize()
                });
                deferred.done(function(){
                    $(form)[0].reset();
                    $("#addConnectionModal").modal('toggle');
                    dataSourceTree.reAsyncChildNodes(null, "refresh");
                })
            }
        })

        $("#executeQuerySql").click(function(){
            var nodes = dataSourceTree.getSelectedNodes();
            var queryParam = {};

            if(nodes.length != 1){
                $("#isCheckDataSourceModal").modal('toggle');
            }else{
                queryParam.sql = $("#executeSql").val();
                queryParam.queryMaxRows = 30;
                if(nodes[0].dbUrl){
                    queryParam.id = nodes[0].id;
                }else{
                    queryParam.id = nodes[0].getParentNode().id
                }

                var deferred = $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: '../connectionManage/executeQuerySql',
                    data : queryParam
                });
                deferred.done(function(result){
                    $("#resultArea").empty();
                    $("#resultArea").append("<table class='gridtable'></table>");
                    $.each(result,function(RowIndex,row){
                        var tr=$("<tr></tr>");
                        $.each(row,function(colIndex,col){
                            if(RowIndex == 0){
                                tr.append("<th>"+ htmlEncode(col) +"</th>")
                            }else {
                                tr.append("<td>" + htmlEncode(col) + "</td>")
                            }
                        })
                        $("#resultArea table").append(tr)
                    });
                })

                function htmlEncode(str) {
                    var div = document.createElement("div");
                    div.appendChild(document.createTextNode(str));
                    return div.innerHTML;
                }
            }
        })

        //打开模态框绑定数据
        $('#addConnectionModal').on('show.bs.modal', function () {
            ko.cleanNode($('#addConnectionModel')[0]);
            var addConnectionModel = new Backbone.Model({dbType: "MySql",dbHost: "",dbPort: "",dbName: ""});
            var addConnectionViewModel = function(model) {
                this.dbType = kb.observable(model, 'dbType');
                this.dbHost = kb.observable(model, 'dbHost');
                this.dbPort = kb.observable(model, 'dbPort');
                this.dbName = kb.observable(model, 'dbName');
                this.dbUrl = ko.computed((function() {
                    return buildUrl(this.dbType(),this.dbHost(),this.dbPort(),this.dbName());
                }), this);
            };
            var buildUrl = function(dbType,dbHost,dbPort,dbName){
                var UrlTemplate = {
                    MySql:"jdbc:mysql://{dbHost}:{dbPort}/{dbName}",
                    SqlServer:"jdbc:sqlserver://{dbHost}:{dbPort};databaseName={dbName}",
                    Oracle:"jdbc:oracle:thin:@//{dbHost}:{dbPort}/{dbName}"
                }
                var template = UrlTemplate[dbType];
                return template.replace(/{dbHost}/,dbHost).replace(/{dbPort}/,dbPort).replace(/{dbName}/,dbName);
            }
            var model = new addConnectionViewModel(addConnectionModel);
            ko.applyBindings(model, $('#addConnectionModel')[0]);
        })
    });
})