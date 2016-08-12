require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "jquery-ui": "lib/jquery-ui.min",
        "jquery-layout": "lib/jquery.layout.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "ztree": "lib/ztree/js/jquery.ztree.all.min",
        "validate": "lib/jquery.validate.min"
    },
    shim : {
        "ztree" : { "deps" :['jquery'] },
        "jquery-ui" : { "deps" :['jquery'] },
        "jquery-layout" : { "deps" :['jquery','jquery-ui'] },
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery','bootstrap','jquery-ui','jquery-layout','ztree','validate'],function($,bootstrap,jquery_ui,jquery_ayout,ztree,validate){
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
                dburl : {
                    required : true,
                    maxlength:300
                },
                username : {
                    required : true,
                    maxlength:300
                },
                password : {
                    required : true,
                    maxlength:300
                }
            },
            messages : {
                dburl : {
                    required : "数据库连接地址为必填项",
                    maxlength:"最大长度为300个字符"
                },
                username : {
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
    });
})