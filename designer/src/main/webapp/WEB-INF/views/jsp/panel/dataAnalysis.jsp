<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/resources/include.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title>Infovis-Designer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap Core CSS -->
    <link href="resources/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="resources/js/lib/bootstrap/css/bootstrap.vertical-tabs.css" rel="stylesheet">
    <!-- Animate -->
    <link href="resources/js/lib/bootstrap/css/animate.css" rel="stylesheet">
    <!--flat admin-->
    <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/css/style.css">
    <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/css/themes/flat-blue.css">

    <!-- Font Icons -->
    <link href="resources/js/lib/bootstrap/css/font-awesome.css" rel="stylesheet">
    <!--ztree-->
    <link href="resources/js/lib/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <!--mCustomScrollbar-->
    <link href="resources/js/lib/mCustomScrollbar/jquery.mCustomScrollbar.min.css" rel="stylesheet">
    <!--custome CSS-->
    <link href="resources/css/dataAnalysis.css" rel="stylesheet">

    <link href="resources/css/customZtreeStyle.css" rel="stylesheet">
    <![endif]-->
</head>

<body class="flat-blue">
<div class="app-container">
    <div class="row content-container">
        <nav class="navbar navbar-inverse navbar-static-top" style="margin-left:-60px;background-color: rgb(238,238,238)">
            <div class="container-fluid">
                <ul class="nav navbar-nav navbar-left">
                    <a class="navbar-brand" href="#" style="color: #ffffff"><i class="glyphicon glyphicon-equalizer" aria-hidden="true"></i> 数据分析</a>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <a href="query.page" role="button"><i class="glyphicon glyphicon-folder-close"></i>&nbsp;&nbsp;我的作品</a>
                    </li>
                    <li class="dropdown">
                        <a href="sqlClient.page"  role="button"><i class="icon fa fa-database"></i>&nbsp;&nbsp;数据源</a>
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
        <div class="navbar-default sidebar scrollable" role="navigation" style="height: 700px;">
            <div class="panel panel-default">
                <div class="panel-heading" role="tab" id="heading">
                    <h4 class="panel-title">
                            <span class="glyphicon glyphicon-indent-left" aria-hidden="true"></span> 数据集
                    </h4>
                </div>
                <div id="collapse" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading">
                    <div class="panel-body leftScrollPanel" style="overflow: auto;height: 120px;background-color: #f9f9f9">
                        <div id="dataListTree" class="ztree"></div>
                    </div>
                </div>
            </div>
            <div class="sidebar-nav  navbar-collapse">
                <ul class="nav" id="side-menu">
                    <li class="active">
                        <a href="#"><i class="fa fa-sitemap fa-fw"></i>请选择数据集<span class="fa arrow"></span></a>
                        <ul class="nav nav-second-level">
                            <li class="active">
                                <a href="#"><b>维度</b> <span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">

                                </ul>
                                <!-- /.nav-third-level -->
                            </li>
                            <li class="active">
                                <a href="#"><b>度量</b> <span class="fa arrow"></span></a>
                                <ul class="nav nav-third-level">

                                </ul>
                                <!-- /.nav-third-level -->
                            </li>
                        </ul>
                        <!-- /.nav-second-level -->
                    </li>
                </ul>
            </div>
        </div>
        <!-- Main Content -->
        <div id="page-wrapper">
            <div>
                <div class="col-lg-11 backUp">
                </div>
                <div class="col-lg-1">
                    <a href="#" data-toggle="modal" data-target="#addChartModal"><button class="btn btn-info saveChartInfo" type="submit"><span class="glyphicon glyphicon-floppy-saved"></span> 保存</button></a>
                </div>
            </div>
            <div class="row content-container">
                <div class="col-lg-12 container-fluid">
                    <form class="form-horizontal make-model-region">
                        <div class="form-group">
                            <div class="col-lg-6">
                                <label class="col-sm-1 control-label">列</label>
                                <div class="col-sm-11 labelDiv trigger-column xAxis" style="overflow: hidden;"></div>
                            </div>
                            <div class="col-lg-6">
                                <label class="col-sm-1 control-label">行</label>
                                <div class="col-sm-11 labelDiv trigger-column yAxis" style="overflow: hidden;"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-lg-6">
                                <label class="col-sm-1 control-label">标记</label>
                                <div class="col-sm-11 labelDiv mark-down-column">
                                    <div class="mark-item col-sm-4 mark-item-color"><i class="fa fa-tachometer"></i> 颜色</div>
                                    <div class="mark-item col-sm-4 mark-item-corner"><i class="fa fa-clock-o"></i> 角度</div>
                                    <div class="mark-item-right col-sm-4 mark-item-tag"><i class="fa fa-tags"></i> 标签</div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <label class="col-sm-1 control-label">筛选</label>
                                <div class="col-sm-11 labelDiv trigger-column column-filter" style="overflow: hidden;z-index:0"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <p style="border-bottom: dashed 1px grey"></p>
            <div class="row">
                <div class="col-lg-12 col-xs-12 col-sm-12">
                    <div class="col-lg-10 col-xs-10">
                        <div id="editArea">
                        </div>
                    </div>
                    <div class="col-lg-2 col-xs-2 col-sm-2">
                        <div class="panel fresh-color panel-default chart-type-select-panel" style="width:100px;float: right">
                            <div class="panel-heading">图表类型</div>
                            <div class="chart-type">
                                <span class="bar">
                                    <img src="resources/img/bar_chart.png">
                                </span>
                                <span class="line">
                                    <img src="resources/img/line_chart.png">
                                </span>
                                <span class="pie">
                                    <img src="resources/img/pie_chart.png">
                                </span>
                            </div>
                            <div class="drag-tips">
                                <div class="tips-bar" style="display: none">
                                    <p><b>标准柱状图</b></p>
                                    <p><b>维度</b> 拖入列</p>
                                    <p><b>度量</b> 拖入行</p>
                                </div>
                                <div class="tips-line" style="display: none">
                                    <p><b>折线图</b></p>
                                    <p><b>维度</b> 拖入列</p>
                                    <p><b>度量</b> 拖入行</p>
                                </div>
                                <div class="tips-pie" style="display: none">
                                    <p><b>饼图</b></p>
                                    <p><b>维度</b> 拖入颜色</p>
                                    <p><b>度量</b> 拖入角度</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade modal-success" id="addChartModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">保存图表</h4>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" id="addChartForm" method="post">
                    <div class="form-group">
                        <label class="col-sm-2 control-label">图表名称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" name="chartName">
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
<script src="resources/js/lib/require.js" defer async="true" data-main="resources/js/app/dataAnalysis"></script>
</body>
</html>
