<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>Infovis-Designer</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap Core CSS -->
    <link href="resources/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="resources/js/lib/bootstrap/css/bootstrap.vertical-tabs.css" rel="stylesheet">
    <!-- Font Icons -->
    <link href="resources/js/lib/bootstrap/css/font-awesome.css" rel="stylesheet">
    <!-- Animate -->
    <link href="resources/js/lib/bootstrap/css/animate.css" rel="stylesheet">
    <!-- gridstack CSS -->
    <link rel="stylesheet" href="resources/js/lib/gridstack/css/gridstack.min.css"/>
    <link rel="stylesheet" type="text/css" href="resources/js/lib/gridstack/css/default.css">
    <!--Color Picker CSS-->
    <link rel="stylesheet" type="text/css" href="resources/js/lib/bootstrap/css/spectrum.css">
    <!--flat admin-->
    <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/css/style.css">
    <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/css/themes/flat-blue.css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style type="text/css">
        body {
            background-image: url("resources/img/pattern.png");
        }
        .grid-stack {
            margin-bottom: 2em;
        }

        #operate i {
            font-size: 20px;
            float:right;
            padding-right:20px;
            margin-top:10px
        }

        #data input {
            border:none;
            outline:medium;
            width:70px;
        }

        #optionModal tr {
            height:20px;
        }

        #optionModal form {
            font-size: 10px;
        }

        .loader .loader-container {
            z-index: 99999999;
        }

        .loader:after {
            z-index: 1000000;
        }
    </style>
</head>

<body class="flat-blue">
<div class="app-container">
    <div class="loader-container text-center color-white" style="display: none;margin-top:-400px;">
        <div><i class="fa fa-spinner fa-pulse fa-3x"></i></div>
        <div>正在生成外部可访问页面，请稍后...</div>
    </div>
    <div class="row content-container">
        <nav class="navbar navbar-default navbar-fixed-top navbar-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-expand-toggle">
                        <i class="fa fa-bars icon"></i>
                    </button>
                    <button type="button" class="navbar-right-expand-toggle pull-right visible-xs">
                        <i class="fa fa-th icon"></i>
                    </button>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown danger">
                        <a href="query.page"  role="button"><i class="glyphicon glyphicon-folder-close"></i>&nbsp;&nbsp;我的作品</a>
                    </li>
                    <li class="dropdown danger" id="exportHtml">
                        <a href="#"  role="button"><i class="glyphicon glyphicon-floppy-save"></i>&nbsp;&nbsp;保存</a>
                    </li>
                    <li class="dropdown profile">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">试用人员1<span class="caret"></span></a>
                        <ul class="dropdown-menu animated fadeInDown">
                            <li class="profile-img">
                                <img src="resources/js/lib/flatadmin/img/profile/picjumbo.com_HNCK4153_resize.jpg" class="profile-img">
                            </li>
                            <li>
                                <div class="profile-info">
                                    <h4 class="username">试用人员1</h4>
                                    <p>test@jiudaotech.com</p>
                                    <div class="btn-group margin-bottom-2x" role="group">
                                        <button type="button" class="btn btn-default"><i class="fa fa-user"></i> 个人信息</button>
                                        <button type="button" class="btn btn-default"><i class="fa fa-sign-out"></i> 登出</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="side-menu sidebar-inverse" style="overflow-y:visible">
            <nav class="navbar navbar-default" role="navigation">
                <div class="side-menu-container">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <div class="icon fa fa-desktop"></div>
                            <div class="title">可视化图表设计器</div>
                        </a>
                        <button type="button" class="navbar-expand-toggle pull-right visible-xs">
                            <i class="fa fa-times icon"></i>
                        </button>
                    </div>
                    <ul class="nav navbar-nav">
                        <li class="active panel panel-default dropdown">
                            <a data-toggle="collapse" href="#dropdown-bar">
                                <span class="icon fa fa-bar-chart" style="font-size: 20px;"></span><span class="title">柱状图</span>
                            </a>
                            <!-- Dropdown level 1 -->
                            <div id="dropdown-bar" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <ul class="nav navbar-nav">
                                        <li>
                                            <div id="bar01" class="col-md-6" style="margin-top: 10px">
                                                <img draggable="true" src="resources/img/bar01.png" alt="..." class="img-thumbnail">
                                            </div>
                                            <div id="bar02" class="col-md-6" style="margin-top: 10px">
                                                <img draggable="true" src="resources/img/bar02.png" alt="..." class="img-thumbnail">
                                            </div>
                                            <div id="bar03" class="col-md-6" style="margin-top: 10px">
                                                <img draggable="true" src="resources/img/bar03.png" alt="..." class="img-thumbnail">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="panel panel-default dropdown">
                            <a data-toggle="collapse" href="#dropdown-pie">
                                <span class="icon fa fa-pie-chart" style="font-size: 20px;"></span><span class="title">饼图</span>
                            </a>
                            <!-- Dropdown level 1 -->
                            <div id="dropdown-pie" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <ul class="nav navbar-nav">
                                        <li>
                                            <div id="pie01" class="col-md-6" style="margin-top: 10px">
                                                <img draggable="true" src="resources/img/pie01.png" alt="..." class="img-thumbnail">
                                            </div>
                                            <div id="pie02" class="col-md-6" style="margin-top: 10px">
                                                <img draggable="true" src="resources/img/pie02.png" alt="..." class="img-thumbnail">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="panel panel-default dropdown">
                            <a data-toggle="collapse" href="#dropdown-line">
                                <span class="icon fa fa-line-chart" style="font-size: 20px;"></span><span class="title">折线图</span>
                            </a>
                            <!-- Dropdown level 1 -->
                            <div id="dropdown-line" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <ul class="nav navbar-nav">
                                        <li>
                                            <div id="line01" class="col-md-6" style="margin-top: 10px">
                                                <img draggable="true" src="resources/img/line01.png" alt="..." class="img-thumbnail">
                                            </div>
                                            <div id="line02" class="col-md-6" style="margin-top: 10px">
                                                <img draggable="true" src="resources/img/line02.png" alt="..." class="img-thumbnail">
                                            </div>
                                            <div id="line03" class="col-md-6" style="margin-top: 10px">
                                                <img draggable="true" src="resources/img/line03.png" alt="..." class="img-thumbnail">
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </nav>
        </div>
        <!-- Main Content -->
        <div class="container-fluid">
            <div class="grid-stack">
                ${htmlCode}
            </div>
        </div>
    </div>
</div>
<input type="hidden" value="${exportId}" id="exportId">
<!--Strart Config Panel-->
<div class="modal fade bs-option-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="optionModal">
    <div class="modal-dialog modal-lg" style="width: 90%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">自定义配置</h4>
            </div>
            <div class="modal-body">
                <div id="optionContainer" style="width:40%;height:410px;float:left">
                </div>
                <div id="optionPanel" style="width:50%;height:410px;float:left;margin-left:50px;">
                </div>
            </div>
            <div class="modal-footer" style="clear:both">
                <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
            </div>
        </div>
    </div>
</div>

<%--<div class="modal fade modal-success" id="modalSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">--%>
    <%--<div class="modal-dialog">--%>
        <%--<div class="modal-content loader">--%>
            <%--<div class="loader-container text-center color-white">--%>
                <%--<div><i class="fa fa-spinner fa-pulse fa-3x"></i></div>--%>
                <%--<div>Loading</div>--%>
            <%--</div>--%>
            <%--<div class="modal-header">--%>
                <%--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--%>
                <%--<h4 class="modal-title" id="myModalLabel">访问连接</h4>--%>
            <%--</div>--%>
            <%--<div class="modal-body">--%>
                <%--<p style="text-align: center">复制以下链接到浏览器即可访问！</p>--%>
                <%--<br>--%>
                <%--<p style="text-align: center" id="targetText"></p>--%>
            <%--</div>--%>
            <%--<div class="modal-footer">--%>
                <%--<button type="button" class="btn btn-info" style="float: right" id="copy" data-clipboard-target="#targetText">复制到剪贴板</button>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>
<%--</div>--%>
<div id="exportOption" style="display:none">
    ${jsCode}
</div>
<script src="resources/js/lib/require.js" defer async="true" data-main="resources/js/app/designPanel"></script>
</body>

</html>
