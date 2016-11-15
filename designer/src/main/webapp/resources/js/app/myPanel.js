require.config({
    baseUrl: 'resources/js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "validate": "lib/jquery.validate.min"
    },
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    waitSeconds: 30
});

//panel删除函数
function dropMyPanel(exportId,obj){
    $.ajax({
        type: 'POST',
        url: 'deleteOne',
        data: 'exportId='+exportId,
        success: function(){
            $(obj).parent().parent().parent().remove();
        },
        error: function(){
            alert("删除出错，请重试");
        }
    })
}

require(['jquery'], function ($) {
    var currentPage = 1;
    $(function() {
        onScroll();
        //绑定scroll事件.
        $(document).bind('scroll', onScroll);
    });

    //定义滚动函数
    function onScroll(event) {
        //是否到底部（这里是判断离底部还有1px开始载入数据）.
        var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 1);
        if(closeToBottom) {
            $(document).unbind('scroll', onScroll);
            $("#loading").css("display", "block");
            setTimeout(function(){
                $.ajax({
                    type: 'POST',
                    url: 'selectList',
                    timeout: 30000,
                    data: {pageSize: 10,page: currentPage},
                    success: function(response){
                        $(document).bind('scroll', onScroll);
                        if(currentPage == response.totalPage){
                            $(document).unbind('scroll', onScroll);
                        }
                        currentPage++;
                        $("#loading").css("display", "none");
                        for(var i=0;i<response.data.length;i++) {
                            $(".card-body").find(".row").append([
                                '<div>',
                                '<div class="thumbnail no-margin-bottom col-md-2" style="margin-top: 25px;margin-left: 40px;">',
                                '<img src=\'data:image/jpg;base64,'+response.data[i].img+'\' onerror="this.src=\'resources/img/white.jpg\'">',
                                '<div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">',
                                '<span style="display:none;">',
                                '<a href="#" onclick=\'dropMyPanel("'+response.data[i].exportId+'", this);\'><i class="glyphicon glyphicon-remove" style="color: white"></i></a>',
                                '<a href=\'showPanel.page?exportId='+response.data[i].exportId+'\'><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>',
                                '<a href=\'share.page?exportId='+response.data[i].exportId+'\' target="_black"><i class="glyphicon glyphicon-zoom-in" style="color: white"></i></a>',
                                '<br>',
                                '<br>',
                                '<p class="overhide">',response.data[i].panelName,'</p>',
                                '<p class="overhide" style="font-size: 15px;">',response.data[i].panelRemark,'</p>',
                                '</span>',
                                '</div>',
                                '</div>',
                                '</div>'].join(""));
                        }

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
                    },
                    error: function(){
                        alert("数据获取超时，请重试。");
                    }
                })
            },500);
        }
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
                maxlength:30
            }
        },
        messages : {
            panelName : {
                required : "设计面板名称为必填项",
                maxlength: "最大长度为30个字符"
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

    $(".dropdown").click(function(){
        $(".dropdown").removeClass("danger");
        $(this).addClass("danger");
    });
});