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
                autoParam:["queryParam", "level=lv"]
            },
            data: {
                key: {
                    name: "dbName"
                }
            },
            callback: {
                onAsyncError: function (event,treeId,treeNode,XMLHttpRequest,textStatus,errorThrown) {
                    alert(1)
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