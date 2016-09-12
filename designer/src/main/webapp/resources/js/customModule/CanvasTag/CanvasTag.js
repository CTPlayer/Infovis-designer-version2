define(['zrender','zrender/tool/color','zrender/shape/Rectangle','jquery','jquery-ui'],function(zrender,color,RectangleShape,$){
    return {
        zr     : {},
        render : function(id){
            this.zr = zrender.init(document.getElementById(id));
            var pageY = this.zr.getHeight();
            var pageX = this.zr.getWidth();
            this.zr.addShape(new RectangleShape({
                style : {
                    x : pageX/8,
                    y : pageY/8,
                    width : pageX - (pageX/4),
                    height: pageY - (pageY/4),
                    brushType : 'both',
                    color : 'rgba(0, 153, 255, 0.8)',          // rgba supported
                    strokeColor : 'rgba(0, 153, 255, 1)',
                    text :'请输入文字',
                    textFont : "bold "+ pageX/8 +"px verdana",
                    textPosition :'inside',
                    textColor : 'yellow',
                    radius: [20, 50],
                    lineWidth : 5
                },
                hoverable : false,
            }));
            this.zr.render();
        }
    }
})