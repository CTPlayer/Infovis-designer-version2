require.config({
    baseUrl: 'js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "validate": "lib/jquery.validate.min",
        "metisMenu": "lib/metisMenu/metisMenu"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "metisMenu" : { "deps" :['jquery'] }
    }
});

require(['jquery','validate','bootstrap','metisMenu'], function($,validate){

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
        toggle:false
    });

});