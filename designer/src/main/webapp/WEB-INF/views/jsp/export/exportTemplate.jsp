<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/resources/include.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <META http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>报表展示</title>
        <!-- gridstack CSS -->
        <link rel="stylesheet" href="resources/js/lib/gridstack/css/gridstack.min.css"/>
        <!--background theme-->
        <link rel="stylesheet" type="text/css" href="resources/css/backgroundTheme.css">
        <!-- Bootstrap Core CSS -->
        <link href="resources/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="resources/js/lib/bootstrap/css/bootstrap.vertical-tabs.css" rel="stylesheet">
        <!-- Font Icons -->
        <link href="resources/js/lib/bootstrap/css/font-awesome.css" rel="stylesheet">
        <!-- Animate -->
        <link href="resources/js/lib/bootstrap/css/animate.css" rel="stylesheet">
        <!--flat admin-->
        <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/css/style.css">
        <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/css/themes/flat-blue.css">
        <!-- checkbox -->
        <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/lib/css/checkbox3.min.css">
        <!--custome CSS-->
        <link href="resources/css/dataAnalysis.css" rel="stylesheet">
        <!--jRange CSS-->
        <link href="resources/js/lib/jRange/jquery.range.css" rel="stylesheet">

        <style>
            .filterIcon{
                margin-top: 30px;
                right: 30px;;
                font-size: 30px;
                position: fixed;
                color: cornflowerblue;
                border:solid 2px cornflowerblue;
                padding: 3px;
            }

            #accordion{
                position: fixed;
                margin-top: 80px;
                right: 15px;
                overflow: auto;
                overflow-y: visible;
                height: 400px;
                padding: 0px;
            }

            .loader-container{
                display: none;
                position :fixed;
                top:80px;
                z-index: 99999999;
                right: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <span class="glyphicon glyphicon-filter filterIcon" aria-hidden="true"></span>

            <div class="loader-container text-center color-blue">
                <div><i class="fa fa-spinner fa-pulse fa-3x"></i></div>
            </div>
            <div class="panel-group col-md-3" id="accordion" role="tablist" aria-multiselectable="true" style="z-index: 99999999">
            </div>

            <input type="hidden" value="${exportId}" id="exportId">
            <div class="grid-stack" id="exportContainer">
                ${htmlCode}
            </div>
        </div>
        <script src="resources/js/lib/require.js" defer async="true" data-main="resources/js/app/exportPanel"></script>
    </body>
</html>