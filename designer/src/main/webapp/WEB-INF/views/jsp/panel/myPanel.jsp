<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Infovis-Designer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style type="text/css">
        .warning-block{
            color : #d16e6c;
        }

        .card-title, .flat-blue .navbar .navbar-nav > li > a, .flat-blue .navbar.navbar-default .navbar-nav > li > a{
            color: #0f77b1;
        }

        .flat-blue .navbar.navbar-inverse .navbar-nav > li.danger > a{
            color: red;
        }

        #operate i {
            font-size: 20px;
            float:right;
            padding-right:20px;
            margin-top:10px
        }

        #operate span {
            font-size: 30px;
            color: white;
            padding-left:20px;
        }

        .thumbnail {
            margin-left: 20px;
        }

        .card {
            background-color: #f5f5f5;
        }

        .overhide {
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    </style>
</head>

<body class="flat-blue">
<div class="app-container" style="background-color: rgb(240,240,240)">
    <div class="row content-container">
        <nav class="navbar navbar-inverse navbar-static-top" style="margin-left:-60px;background-color: rgb(238,238,238)">
            <div class="container-fluid">
                <ul class="nav navbar-nav navbar-left">
                    <a class="navbar-brand" href="#" style="color: #ffffff">控制面板</a>
                </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown danger">
                    <a href="query.page"  role="button"><i class="glyphicon glyphicon-folder-close"></i>&nbsp;&nbsp;我的作品</a>
                </li>
                <li class="dropdown">
                    <a href="resources/sqlClient.html"  role="button"><i class="icon fa fa-database"></i>&nbsp;&nbsp;数据源</a>
                </li>
                <li class="dropdown" id="exportHtml">
                    <a href="#"  role="button" data-toggle="modal" data-target="#addPanelModal"><i class="glyphicon glyphicon-plus"></i>&nbsp;&nbsp;新建面板</a>
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
        <!-- Main Content -->
        <div class="container-fluid">
            <%--<div class="row">--%>
                <%--<c:forEach var="myPanel" items="${myPanels}">--%>
                <%--<div>--%>
                    <%--<div class="thumbnail no-margin-bottom col-md-2" style="margin-top: 25px;margin-left: 40px;">--%>
                        <%--<img src="data:image/jpg;base64,${myPanel.img}" style="box-shadow: 0 0 3px #000;">--%>
                        <%--<div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">--%>
                            <%--<span style="display:none;">--%>
                                <%--${myPanel.panelName}--%>
                                <%--<a href="deleteOne?exportId=${myPanel.exportId}"><i class="glyphicon glyphicon-remove" style="color: white"></i></a>--%>
                                <%--<a href="showPanel.page?exportId=${myPanel.exportId}" ><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>--%>
                                <%--<a href="share.page?exportId=${myPanel.exportId}" ><i class="glyphicon glyphicon-zoom-in" style="color: white"></i></a>--%>
                            <%--</span>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--</c:forEach>--%>
            <%--</div>--%>
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                <h4>我的作品</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <div>
                                <div class="row">
                                    <c:forEach var="myPanel" items="${myPanels}">
                                    <div>
                                        <div class="thumbnail no-margin-bottom col-md-2" style="margin-top: 25px;margin-left: 40px;">
                                            <img src="data:image/jpg;base64,${myPanel.img}">
                                            <div id="operate" style="width:100%;height:0px;background-color:rgb(53,61,71);position:absolute;top:0px;opacity:0.8">
                                                <span style="display:none;">
                                                    <a href="deleteOne?exportId=${myPanel.exportId}"><i class="glyphicon glyphicon-remove" style="color: white"></i></a>
                                                    <a href="showPanel.page?exportId=${myPanel.exportId}" ><i class="glyphicon glyphicon-pencil" style="color: white"></i></a>
                                                    <a href="share.page?exportId=${myPanel.exportId}" ><i class="glyphicon glyphicon-zoom-in" style="color: white"></i></a>
                                                    <br>
                                                    <br>
                                                    <p class="overhide">${myPanel.panelName}</p>
                                                    <p class="overhide" style="font-size: 15px;">${myPanel.panelRemark}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    </c:forEach>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade modal-success" id="addPanelModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">新建设计面板</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="addPanelForm" method="post">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">面板名称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="panelName">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">面板备注</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" rows="3" name="panelRemark"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-success">确认</button>
            </div>
        </div>
    </div>
</div>
<script src="resources/js/lib/require.js" defer async="true" data-main="resources/js/app/myPanel"></script>
</body>
</html>
