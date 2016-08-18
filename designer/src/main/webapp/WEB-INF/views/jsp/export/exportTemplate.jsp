<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>报表展示</title>
        <link href="/designer/resources/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/designer/resources/js/lib/gridstack/css/gridstack.min.css"/>
    </head>
    <body>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <p class="lead" style="text-align: center;line-height: 49px;">图表展示</p>
            </div>
        </nav>
        <div class="container">
            <div class="grid-stack" id="exportContainer">
                ${htmlCode}
            </div>
        </div>
        <div id="exportOption" style="display:none">
            ${jsCode}
        </div>
        <script src="/designer/resources/js/lib/require.js" defer async="true" data-main="/designer/resources/js/app/exportPanel"></script>
    </body>
</html>