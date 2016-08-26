require.config({
    baseUrl: 'resources/js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "validate": "lib/jquery.validate.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    }
});

require(['jquery','validate','bootstrap'], function($,validate){
    $("#addPanelModal .btn-success").click(function(){
        $("#addPanelForm").submit();
    });
    
    $("#addPanelForm").validate({
        errorElement : 'div',
        errorClass : 'warning-block',
        focusInvalid : true,
        ignore : "",
        rules : {
            panelName : {
                required : true,
                maxlength:300
            }
        },
        messages : {
            panelName : {
                required : "设计面板名称为必填项",
                maxlength: "最大长度为50个字符"
            }
        },
        submitHandler : function(form){
            var deferred = $.ajax({
                type: 'POST',
                url: 'addPanel',
                data : $(form).serialize()
            });
            deferred.done(function(data){
                $(form)[0].reset();
                $("#addPanelModal").modal('toggle');
                top.window.location = "showPanel.page?exportId="+data;
            })
        }
    });

    $(".thumbnail").on('mouseenter mouseleave',function(e){
        var target = $("#operate",$(this));
        if(e.type == 'mouseenter'){
            target.stop();
            target.children().css("display","block");
            target.animate({height:"100%"},"fast");
        }else if(e.type == 'mouseleave'){
            target.stop();
            target.children().css("display","none");
            if(target.css('height') != '0px') {
                target.animate({height: "0"},"fast");
            }
        }
    });

    $(".dropdown").click(function(){
        $(".dropdown").removeClass("danger");
        $(this).addClass("danger");
    });
});