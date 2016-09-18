<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/resources/include.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title>Infovis-Designer</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <!-- Bootstrap Core CSS -->
    <link href="resources/js/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="resources/js/lib/bootstrap/css/bootstrap.vertical-tabs.css" rel="stylesheet">

    <!-- Font Icons -->
    <link href="resources/js/lib/bootstrap/css/font-awesome.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!--ztree-->
    <link href="resources/js/lib/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
    <!--CodeMirror-->
    <link href="resources/js/lib/cm/lib/codemirror.css" rel="stylesheet">
    <!--dataTables-->
    <link href="resources/js/lib/dataTables/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="resources/js/lib/dataTables/css/dataTables.bootstrap.min.css" rel="stylesheet">

    <!--flat admin-->
    <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/css/style.css">
    <link rel="stylesheet" type="text/css" href="resources/js/lib/flatadmin/css/themes/flat-blue.css">
    <!--custom ztree css-->
    <link href="resources/css/customZtreeStyle.css" rel="stylesheet">

    <!--steps-->
    <link href="resources/js/lib/jquery.steps/jquery.steps.css" rel="stylesheet">

    <style type="text/css">

        .scrollable {
            overflow: scroll;
        }

        table.dataTable thead .sorting,
        table.dataTable thead .sorting_asc,
        table.dataTable thead .sorting_desc {
            background : none;
        }
        .CodeMirror {
            border: 1px solid #eee;
            height: 170px;
        }
        /*
         * Customize borders and shading to suit this nested layout
         */

        .ui-layout-pane { /* all 'panes' */
            padding: 10px;
            background: #FFF;
            border-top: 1px solid #BBB;
            border-bottom: 1px solid #BBB;
        }
        .ui-layout-pane-north ,
        .ui-layout-pane-south {
            border: 1px solid #BBB;
        }
        .ui-layout-pane-west {
            border-left: 1px solid #BBB;
        }
        .ui-layout-pane-east {
            border-right: 1px solid #BBB;
        }
        .ui-layout-pane-center {
            border-left: 0;
            border-right: 0;
        }
        .inner-center {
            border: 1px solid #BBB;
        }

        .outer-west ,
        .outer-east {
            background-color: #EEE;
        }

        .middle-west ,
        .middle-east {
            background-color: #F8F8F8;
        }

        .ui-layout-resizer { /* all 'resizer-bars' */
            background: #DDD;
        }
        .ui-layout-resizer:hover { /* all 'resizer-bars' */
            background: #FED;
        }
        .ui-layout-resizer-west {
            border-left: 1px solid #BBB;
        }
        .ui-layout-resizer-east {
            border-right: 1px solid #BBB;
        }

        .ui-layout-toggler { /* all 'toggler-buttons' */
            background: #AAA;
        }
        .ui-layout-toggler:hover { /* all 'toggler-buttons' */
            background: #FC3;
        }

        .outer-center ,
        .middle-center {
            /* center pane that are 'containers' for a nested layout */
            padding: 0;
            border: 0;
        }
        .warning-block{
            color : #d16e6c;
        }


        table.gridtable {
            font-family: verdana,arial,sans-serif;
            font-size:11px;
            color:#333333;
            border-width: 1px;
            border-color: #666666;
            border-collapse: collapse;
        }
        table.gridtable th {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #dedede;
        }
        table.gridtable td {
            border-width: 1px;
            padding: 8px;
            border-style: solid;
            border-color: #666666;
            background-color: #ffffff;
        }
    </style>
    <style>
        /**
	     *	Cosmetic Styling for Layout Elements
	     */
        .ui-layout-pane {
            background:	#FFF;
            padding:	10px;
            overflow:	auto;
        }
        .ui-layout-pane-west{
            background-color: #f8f8f8;
        }
        .ui-layout-resizer {
            background:	#FFF;
        }
        .ui-layout-toggler {
            display: none;
        }
        .ui-layout-north {
            background:	#FFF;
            padding:	10px;
            overflow:	hidden;
        }
        .flat-blue .navbar .navbar-nav > li > a, .flat-blue .navbar.navbar-default .navbar-nav > li > a,.leftBarLiIcon{
            color: #0f77b1;
        }

        .selectDB {
            border-style:solid;
            border-color: #19B5FE;
        }
    </style>

    <script src="resources/js/lib/require.js" defer async="true" data-main="resources/js/app/sqlClient"></script>
</head>
<body class="flat-blue">
<div class="ui-layout-north">
    <div>
        <div class="app-container">
            <div class="row content-container">
                <nav class="navbar navbar-inverse navbar-static-top" style="margin-left:-80px;margin-right:-15px;margin-top:-10px;background-color: rgb(238,238,238)">
                    <div class="container-fluid">
                        <ul class="nav navbar-nav navbar-left">
                            <a class="navbar-brand" href="#" style="color: #ffffff"><i class="glyphicon glyphicon-equalizer" aria-hidden="true"></i> 数据源</a>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li>
                                <a href="javascript: void(0);" data-toggle="modal" data-target="#addConnectionModal">新增连接</a>
                            </li>
                            <li>
                                <a href="javascript: void(0);" id="deleteDB" >删除连接</a>
                            </li>
                            <li class="dropdown">
                                <a href="query.page" role="button"><i class="glyphicon glyphicon-folder-close"></i>&nbsp;&nbsp;我的作品</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</div>
<div class="outer-center">
    <div class="middle-center">
        <div class="inner-center scrollable">
            <div id="savebar" style="display: none"><button type="button" class="btn btn-success" id="saveQuerySql">结果集保存</button></div>
            <div class="btn-group" role="group" id="sqlresultbargroup" style="display: none">
                <button type="button" class="btn btn-success" id="updateSqlResultBar">更新</button>
                <button type="button" class="btn btn-warning" id="deleteSqlResultBar">删除</button>
            </div>
            <div id="sqlResultId" style="display: none;"></div>
            <div id="sqlRecordingName" style="display: none;"></div>
            <div id="resultArea"></div>
            <div id="pagebar"></div>
        </div>
        <div class="ui-layout-north">
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-success" id="executeQuerySql">查询SQL</button>
                <button type="button" class="btn btn-primary" id="formattSelectSql">美化SQL</button>
                <button type="button" class="btn btn-warning" id="clearSql">清除SQL</button>
            </div>
            <div style="margin-top: 5px"></div>
            <textarea id='executeSql' name="sql" style="height: 100%;width: 100%;resize: none;"></textarea>
        </div>
    </div>
</div>
<div class="outer-west scrollable">
    <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingOne">
                <h4 class="panel-title">
                    <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span class="glyphicon glyphicon-list" aria-hidden="true"></span> 数据源
                    </a>
                </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body" style="overflow-x:scroll;background-color: #F8F8F8 ">
                    <ul id="dataSourceTree" class="ztree"></ul>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingTwo">
                <h4 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <span class="glyphicon glyphicon-indent-left" aria-hidden="true"></span> 数据集
                    </a>
                </h4>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="panel-body scrollable" style="background-color: #F8F8F8">
                    <ul id="dataListTree" class="ztree"></ul>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="addConnectionModal" tabindex="-1" role="dialog" >
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >新增连接</h4>
            </div>
            <div class="modal-body">
                <form id="addConnectionForm" method="post">
                    <div id="addConnectionModel">
                        <h3>选择数据库类型</h3>
                        <section>
                            <div>
                                <div style="position: absolute;top : 50%;margin-top: -75px;width: 100%" align="center">
                                    <span style="margin-left: 10px">
                                        <div class="selectDB" style="display: inline-block">
                                            <img class="dbSpan" dbtype="MySql" src="resources/img/addMysql.png" style="width: 150px;height: 150px">
                                        </div>
                                    </span>
                                    <span style="margin-left: 10px">
                                        <div style="display: inline-block">
                                            <img class="dbSpan" dbtype="Oracle"  src="resources/img/addOracle.png" style="width: 150px;height: 150px">
                                        </div>
                                    </span>
                                    <span style="margin-left: 10px">
                                        <div style="display: inline-block">
                                            <img class="dbSpan" dbtype="SqlServer"  src="resources/img/addSqlserver.png" style="width: 150px;height: 150px">
                                        </div>
                                    </span>
                                </div>
                            </div>
                        </section>
                        <h3>连接信息</h3>
                        <section>
                            <div class="form-group">
                                <select class="form-control" name="dbType" style="display: none" data-bind="value: dbType,event: { change: changeType}">
                                    <option name="MySql">MySql</option>
                                    <option name="SqlServer">SqlServer</option>
                                    <option name="Oracle">Oracle</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="dbName" placeholder="数据库名称" data-bind="value: dbName, valueUpdate: 'input'" />
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="dbHost" placeholder="数据库主机名" data-bind="value: dbHost, valueUpdate: 'input'">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="dbPort" placeholder="数据库端口号" data-bind="value: dbPort, valueUpdate: 'input'">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" name="userName" placeholder="用户名">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" name="password" placeholder="密码">
                            </div>
                            <div class="form-group">
                                <input type="hidden" class="form-control" name="dbUrl" data-bind="value: dbUrl" placeholder="数据库连接地址">
                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="saveQuerySqlModal" tabindex="-1" role="dialog" >
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >保存数据集</h4>
            </div>
            <div class="modal-body">
                <form id="saveQuerySqlForm" method="post">
                    <div class="form-group">
                        <input type="text" class="form-control" name="recordingName" placeholder="数据集名称" />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary">保存</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="isCheckModal" tabindex="-1" role="dialog" >
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >提示</h4>
            </div>
            <div class="modal-body" style="text-align:center">
                <h5>请先选择一个节点</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="onlyDBModal" tabindex="-1" role="dialog" >
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >提示</h4>
            </div>
            <div class="modal-body" style="text-align:center">
                <h5>只能选择数据库节点</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="isDeleteModal" tabindex="-1" role="dialog" >
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >提示</h4>
            </div>
            <div class="modal-body" style="text-align:center">
                <h5>该操作将会删除数据库连接,请确认是否删除</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" >确认</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="isCheckDataSourceModal" tabindex="-1" role="dialog" >
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >提示</h4>
            </div>
            <div class="modal-body" style="text-align:center">
                <h5>请先选择一个数据源</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
</body>

</html>
