<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/resources/include.jsp"%>
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
        <nav class="navbar navbar-inverse navbar-static-top">
            <div class="container-fluid">
                <ul class="nav navbar-nav navbar-left">
                    <a class="navbar-brand" href="#" style="color: #ffffff"><i class="glyphicon glyphicon-equalizer" aria-hidden="true"></i> 作品列表</a>
                </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown danger">
                    <a href="query.page"  role="button"><i class="glyphicon glyphicon-folder-close"></i>&nbsp;&nbsp;我的作品</a>
                </li>
                <li class="dropdown">
                    <a href="sqlClient.page"  role="button"><i class="icon fa fa-database"></i>&nbsp;&nbsp;数据源</a>
                </li>
                <li class="dropdown" id="exportHtml">
                    <a href="#"  role="button" data-toggle="modal" data-target="#addPanelModal"><i class="glyphicon glyphicon-plus"></i>&nbsp;&nbsp;新建面板</a>
                </li>
            </ul>
            </div>
        </nav>
        <!-- Main Content -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">
                                <h4>我的作品</h4>
                            </div>
                        </div>
                        <div class="card-body" style="position: relative">
                            <div>
                                <div class="row">

                                </div>
                                <div id="loading" class="loader-container text-center color-black" style="display: none;">
                                    <div><i class="fa fa-spinner fa-pulse fa-3x"></i></div>
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
