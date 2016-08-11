require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "jquery-ui": "lib/jquery-ui.min",
        "jquery-layout": "lib/jquery.layout.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] }
    }
});

require(['jquery','bootstrap','jquery-ui','jquery-layout'],function($,bootstrap,jquery_ui,jquery_ayout){
    $(function(){
        outerLayout = $('body').layout({
            center__paneSelector:	".outer-center"
            ,	west__paneSelector:		".outer-west"
            ,	east__paneSelector:		".outer-east"
            ,	west__size:				200
            ,	east__size:				125
            ,	spacing_open:			8 // ALL panes
            ,	spacing_closed:			12 // ALL panes
            ,	north__spacing_open:	0
            ,	south__spacing_open:	0
            ,	center__onresize:		"middleLayout.resizeAll"
        });

        middleLayout = $('div.outer-center').layout({
            center__paneSelector:	".middle-center"
            ,	west__paneSelector:		".middle-west"
            ,	east__paneSelector:		".middle-east"
            ,	west__size:				100
            ,	east__size:				100
            ,	spacing_open:			8  // ALL panes
            ,	spacing_closed:			12 // ALL panes
            ,	center__onresize:		"innerLayout.resizeAll"
        });

        innerLayout = $('div.middle-center').layout({
            center__paneSelector:	".inner-center"
            ,	north__size:		    200
            ,	spacing_open:			8  // ALL panes
            ,	spacing_closed:			8  // ALL panes
            ,	north__spacing_closed:	12
        });
    });
})