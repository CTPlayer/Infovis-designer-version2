require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "jquery-ui": "lib/jquery-ui.min",
        "jquery-layout": "lib/jquery.layout.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "ztree": "lib/ztree/js/jquery.ztree.all.min"
    },
    shim : {
        "jquery-ui" : { "deps" :['jquery'] },
        "jquery-layout" : { "deps" :['jquery','jquery-ui'] },
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery','bootstrap','jquery-ui','jquery-layout','ztree'],function($,bootstrap,jquery_ui,jquery_ayout,ztree){
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
            data: {
                simpleData: {
                    enable: true
                }
            }
        };

        var zNodes =[
            { id:1, pId:0, name:"父节点1 - 展开", open:true},
            { id:11, pId:1, name:"父节点11 - 折叠"},
            { id:111, pId:11, name:"叶子节点111"},
            { id:112, pId:11, name:"叶子节点112"},
            { id:113, pId:11, name:"叶子节点113"},
            { id:114, pId:11, name:"叶子节点114"},
            { id:12, pId:1, name:"父节点12 - 折叠"},
            { id:121, pId:12, name:"叶子节点121"},
            { id:122, pId:12, name:"叶子节点122"},
            { id:123, pId:12, name:"叶子节点123"},
            { id:124, pId:12, name:"叶子节点124"},
            { id:13, pId:1, name:"父节点13 - 没有子节点", isParent:true},
            { id:2, pId:0, name:"父节点2 - 折叠"},
            { id:21, pId:2, name:"父节点21 - 展开", open:true},
            { id:211, pId:21, name:"叶子节点211"},
            { id:212, pId:21, name:"叶子节点212"},
            { id:213, pId:21, name:"叶子节点213"},
            { id:214, pId:21, name:"叶子节点214"},
            { id:22, pId:2, name:"父节点22 - 折叠"},
            { id:221, pId:22, name:"叶子节点221"},
            { id:222, pId:22, name:"叶子节点222"},
            { id:223, pId:22, name:"叶子节点223"},
            { id:224, pId:22, name:"叶子节点224"},
            { id:23, pId:2, name:"父节点23 - 折叠"},
            { id:231, pId:23, name:"叶子节点231"},
            { id:232, pId:23, name:"叶子节点232"},
            { id:233, pId:23, name:"叶子节点233"},
            { id:234, pId:23, name:"叶子节点234"},
            { id:3, pId:0, name:"父节点3 - 没有子节点", isParent:true}
        ];

        var dataSourceTree = $.fn.zTree.init($("#dataSourceTree"),setting,zNodes);
    });
})