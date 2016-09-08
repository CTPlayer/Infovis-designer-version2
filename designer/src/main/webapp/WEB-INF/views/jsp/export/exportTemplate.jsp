<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/resources/include.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>报表展示</title>
        <link href="resources/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="resources/js/lib/gridstack/css/gridstack.min.css"/>
        <!--background theme-->
        <link rel="stylesheet" type="text/css" href="resources/css/backgroundTheme.css">
    </head>
    <body>
        <div class="container">
            <input type="hidden" value="${exportId}" id="exportId">
            <div class="grid-stack" id="exportContainer">
                ${htmlCode}
            </div>
        </div>
        <script src="resources/js/lib/require.js" defer async="true" data-main="resources/js/app/exportPanel"></script>
    </body>
</html>