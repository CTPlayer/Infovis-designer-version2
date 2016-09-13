define(['zrender','zrender/tool/color','zrender/shape/Rectangle','jquery','jquery-ui'],function(zrender,color,RectangleShape,$){
    return function() {
        var zr = {};
        return {
            render: function (id, option) {
                var target = $("#" + id);
                zr = zrender.init(target[0]);
                //绑定zrenderid
                target.attr("zid",zr.getId());
                var pageY = zr.getHeight();
                var pageX = zr.getWidth();
                if (!option) {
                    zr.addShape(new RectangleShape({
                        style: {
                            x: pageX / 8,
                            y: pageY / 8,
                            width: pageX - (pageX / 4),
                            height: pageY - (pageY / 4),
                            brushType: 'both',
                            color: 'rgba(0, 153, 255, 0.8)',          // rgba supported
                            strokeColor: 'rgba(0, 153, 255, 1)',
                            text: '请输入文字',
                            textFont: "bold " + pageX / 8 + "px verdana",
                            textPosition: 'inside',
                            textColor: 'yellow',
                            radius: [20, 50],
                            lineWidth: 5
                        },
                        hoverable: false,
                    }));
                } else {
                    option.x = pageX / 8;
                    option.y = pageY / 8;
                    option.width = pageX - (pageX / 4);
                    option.height = pageY - (pageY / 4);
                    //option.textFont =  "bold " + pageX / 8 + "px verdana";
                    zr.addShape(new RectangleShape({
                        style: option,
                        hoverable: false,
                    }));
                }
                zr.render();
                return this;
            },
            getOption: function () {
                if(zr){
                    return zr.storage.getShapeList()[0].style;
                }
            }
        }
    }
})