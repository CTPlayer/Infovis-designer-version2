define(function(){
        var downloadHtml = function(data){
                //获取当前时间戳
                var timestamp = Date.parse(new Date());
                timestamp = timestamp / 1000;              
           
                var ev = document.createEvent("MouseEvents");
                ev.initMouseEvent(
                    "click", true, false, window, 0, 0, 0, 0, 0
                    , false, false, false, false, 0, null
                    );
               
                var urlObject = window.URL || window.webkitURL || window;            
                var export_blob = new Blob([data]);            
                var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                save_link.href = urlObject.createObjectURL(export_blob);
                save_link.download = timestamp+".html";
                save_link.dispatchEvent(ev);
        };
        
        return {
            downloadHtml : downloadHtml
        };
});
