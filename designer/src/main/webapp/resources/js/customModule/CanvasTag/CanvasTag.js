define(['zrender','zrender/tool/color','zrender/shape/Circle','jquery','jquery-ui'],function(zrender,color,CircleShape,$){
    return {
        zr     : {},
        render : function(id){
            this.zr = zrender.init(document.getElementById(id));
            $("#"+id).draggable();
            this.zr.addShape(new CircleShape({
                style : {
                    x : 100,
                    y : 100,
                    r : 100,
                    brushType : 'fill',
                    color : 'rgba(220, 20, 60, 0.8)',          // rgba supported
                    lineWidth : 5,
                    text :'circle',
                    textPosition :'inside'
                },
                hoverable : false,
            }));
            this.zr.render();
        }
    }
})