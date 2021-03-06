<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@include file="/resources/include.jsp"%>
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
    <!--background theme-->
    <link rel="stylesheet" type="text/css" href="resources/css/backgroundTheme.css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style type="text/css">
        .grid-stack {
            margin-bottom: 2em;
            margin-left: 3em;
            margin-top: 5em;
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

        .selected {
            border-color:#3ac34f;
        }

        #chartTitle {
            font-size: 24px;
            color: white;
            padding-left:20px;
            margin-top:10px
        }

        .background-text-pick-block span{
            width:50px;
            height: 50px;
            margin-top:5px;
            margin-left: 5px;
            display: inline-block;
            cursor: pointer;
        }

        .background-text-pick-block div{
            color:white;
            width: 50px;
            text-align: center;
            margin-left: 5px;
            margin-bottom: 5px;
        }

        .background-color-pick-block span{
            width:50px;
            height: 50px;
            margin-top:5px;
            margin-left: 5px;
            display: inline-block;
            cursor: pointer;
        }

        .background-color-pick-block{
            display: inline-block;
        }

        .background-color-pick-block div{
            color:white;
            width: 50px;
            text-align: center;
            margin-left: 5px;
            margin-bottom: 5px;
        }

        #myChart .thumbnail .glyphicon-ok{
            display: none;
        }

        #mySubGroup .thumbnail .glyphicon-ok{
            display: none;
        }

        #myChart .selected .glyphicon-ok{
             position: absolute;
             right: 5px;
             top:130px;
             color:white;
             display: block;
             height: 10px;
             width: 10px;
         }

        #mySubGroup .selected .glyphicon-ok{
            position: absolute;
            right: 5px;
            top:130px;
            color:white;
            display: block;
            height: 10px;
            width: 10px;
        }

        #myChart .thumbnail .glyphicon-remove{
            position: absolute;
            right: 5px;
            top:5px;
            color:white;
            display: block;
            height: 10px;
            width: 10px;
        }

        #mySubGroup .thumbnail .glyphicon-remove{
            position: absolute;
            right: 5px;
            top:5px;
            color:white;
            display: block;
            height: 10px;
            width: 10px;
        }

        #myChart .selected .arrow_left{
            border-color: transparent #3ac34f #3ac34f transparent;
            border-style: solid;
            border-width: 18px;
            font-size: 0;
            display: block;
            height: 0;
            line-height: 0;
            position: absolute;
            right: 0;
            bottom: 0;
            width: 0;
        }

        #mySubGroup .selected .arrow_left{
            border-color: transparent #3ac34f #3ac34f transparent;
            border-style: solid;
            border-width: 18px;
            font-size: 0;
            display: block;
            height: 0;
            line-height: 0;
            position: absolute;
            right: 0;
            bottom: 0;
            width: 0;
        }

        .thumbnail .arrow_top{
            border-color: #337ab7 #337ab7 transparent transparent;
            border-style: solid;
            border-width: 18px;
            font-size: 0;
            display: block;
            height: 0;
            line-height: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: 0;
        }

        #myChart .thumbnail{
            cursor: pointer;
        }

        #mySubGroup .thumbnail{
            cursor: pointer;
        }

        #myChart .thumbnail p{
            position: absolute;
            bottom:5px;
            left:15px;
            color: rgba(70, 49, 49, 0.49);
            font-weight: bolder;
            width:180px;
            height:18px;
            display:block;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
        }

        #dropdown-theme-choose li{
            margin-top: 10px;
        }
    </style>
</head>

<body class="flat-blue">
<div class="app-container">
    <div class="loader-container text-center color-white" style="display: none;position :fixed;top:300px;">
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
                    <li class="dropdown">
                        <a href="query.page"  role="button"><i class="glyphicon glyphicon-folder-close"></i>&nbsp;&nbsp;我的作品</a>
                    </li>
                    <li class="dropdown" id="exportHtml">
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
                        <li class="panel-default">
                            <a href="dataAnalysis.page?exportId=${exportId}"><span class="icon fa fa-plus"></span><span class="title">新建图表</span></a>
                        </li>
                        <li class="panel-default">
                            <a href="#" data-toggle="modal" data-target="#myChart"><span class="icon fa fa-area-chart"></span><span class="title">添加已有图表</span></a>
                        </li>
                        <li class="panel panel-default dropdown">
                            <a data-toggle="collapse" href="#dropdown-theme-choose">
                                <span class="icon fa fa-magic"></span><span class="title">配色设置</span>
                            </a>
                            <div id="dropdown-theme-choose" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <ul class="nav navbar-nav">
                                        <li>
                                            <div class="vintage"><img src="resources/img/theme-vintage.png" style="height: 30px;" class="col-md-6"/></div>
                                            <div class="dark"><img src="resources/img/theme-dark.png" style="height: 30px;" class="col-md-6"/></div>
                                        </li>
                                        <li>
                                            <div class="westeros"><img src="resources/img/theme-westeros.png" style="height: 30px;" class="col-md-6"/></div>
                                            <div class="essos"><img src="resources/img/theme-essos.png" style="height: 30px;" class="col-md-6"/></div>
                                        </li>
                                        <li>
                                            <div class="wonderland"><img src="resources/img/theme-wonderland.png" style="height: 30px;" class="col-md-6"/></div>
                                            <div class="walden"><img src="resources/img/theme-walden.png" style="height: 30px;" class="col-md-6"/></div>
                                        </li>
                                        <li>
                                            <div class="chalk"><img src="resources/img/theme-chalk.png" style="height: 30px;" class="col-md-6"/></div>
                                            <div class="infographic"><img src="resources/img/theme-infographic.png" style="height: 30px;" class="col-md-6"/></div>
                                        </li>
                                        <li>
                                            <div class="macarons"><img src="resources/img/theme-macarons.png" style="height: 30px;" class="col-md-6"/></div>
                                            <div class="roma"><img src="resources/img/theme-roma.png" style="height: 30px;" class="col-md-6"/></div>
                                        </li>
                                        <li>
                                            <div class="shine"><img src="resources/img/theme-shine.png" style="height: 30px;" class="col-md-6"/></div>
                                            <div class="purple-passion"><img src="resources/img/theme-purple-passion.png" style="height: 30px;" class="col-md-6"/></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="panel panel-default dropdown">
                            <a data-toggle="collapse" href="#dropdown-background-choose">
                                <span class="icon glyphicon glyphicon-picture"></span><span class="title">背景设置</span>
                            </a>
                            <div id="dropdown-background-choose" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <ul class="nav navbar-nav">
                                        <li>
                                            <div class="background-color-pick-block">
                                                <span class="background-default"></span>
                                                <div>默认</div>
                                            </div>
                                            <div class="background-color-pick-block">
                                                <span class="background-white"></span>
                                                <div>优雅白</div>
                                            </div>
                                            <div class="background-color-pick-block">
                                                <span class="background-black"></span>
                                                <div>高端黑</div>
                                            </div>
                                            <div class="background-color-pick-block">
                                                <span class="background-env-green"></span>
                                                <div>环保绿</div>
                                            </div>
                                            <div class="background-color-pick-block">
                                                <span class="background-business-grey"></span>
                                                <div>商务灰</div>
                                            </div>
                                            <div class="background-color-pick-block">
                                                <span class="background-dream-blue"></span>
                                                <div>梦幻蓝</div>
                                            </div>
                                            <div class="background-color-pick-block">
                                                <span class="background-dream-sky"></span>
                                                <div>星空蓝</div>
                                            </div>
                                            <div class="background-color-pick-block">
                                                <span class="background-dream-purple"></span>
                                                <div>绚丽紫</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="panel panel-default dropdown">
                            <a data-toggle="collapse" href="#dropdown-text-choose">
                                <span class="icon glyphicon glyphicon-text-size"></span><span class="title">文字组件</span>
                            </a>
                            <div id="dropdown-text-choose" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <ul class="nav navbar-nav">
                                        <li>
                                            <div style="display:inline-block;" class="background-text-pick-block">
                                                <span class="background-default" textType="rectangle"></span>
                                                <div>默认</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="panel-default">
                            <a href="#" data-toggle="modal" data-target="#subGroupModal"><span class="icon fa fa-cog"></span><span class="title">新建标题框</span></a>
                        </li>
                        <li class="panel-default">
                            <a href="#" data-toggle="modal" data-target="#mySubGroup"><span class="icon fa fa-archive"></span><span class="title">我的标题框</span></a>
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
                <div id="loading" class="loader-container text-center color-black" style="display: none;">
                    <div><i class="fa fa-spinner fa-pulse fa-3x"></i></div>
                    <div>正在加载,请稍后...</div>
                </div>
                <div id="optionContainer" style="width:40%;height:410px;float:left;">
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
<div class="modal fade" id="myChart" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 70%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title" id="myModalLabel">我的图表</h4>
            </div>
            <div class="modal-body" style="height: 386px;overflow-y: scroll">
                <div class="row"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary">确认</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade bs-option-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="textOptionModal">
    <div class="modal-dialog modal-lg" style="width: 90%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">自定义配置</h4>
            </div>
            <div class="modal-body">
                <div id="textLoading" class="loader-container text-center color-black" style="display: none;">
                    <div><i class="fa fa-spinner fa-pulse fa-3x"></i></div>
                    <div>正在加载,请稍后...</div>
                </div>
                <div id="textOptionContainer" style="width:40%;height:410px;float:left;">
                </div>
                <div id="textOptionPanel" style="width:50%;height:410px;float:left;margin-left:50px;">
                </div>
            </div>
            <div class="modal-footer" style="clear:both">
                <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade bs-option-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="subGroupModal">
    <div class="modal-dialog modal-lg" style="width: 90%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">自定义组件</h4>
            </div>
            <div class="modal-body">
                <div id="subGroupContainer" style="width:40%;height:410px;float:left;background-color: rgb(238,238,238);overflow: auto">
                    <div id="subGroupLoading" class="loader-container text-center color-black" style="display: none;">
                        <div><i class="fa fa-spinner fa-pulse fa-3x"></i></div>
                        <div>正在加载图片...</div>
                    </div>
                </div>
                <div id="subGroupOptionPanel" style="width:50%;height:410px;float:left;margin-left:50px;">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="active"><a href="#param" data-toggle="tab">配置项</a></li>
                    </ul>
                    <div class="col-xs-11" style="height:350px;overflow:auto;margin-top: 10px;" id="subGroupConfig">
                        <div>
                        <form enctype="multipart/form-data" id="imgFile">
                            <input name="imgFile" type="file" />
                            <button type="reset" class="btn btn-sm btn-warning" style="margin-left: 10px;float: right">重置</button>
                            <button type="button" class="btn btn-sm btn-success" style="float: right">上传</button>
                            <p class="help-block">请上传组件图片.</p>
                        </form>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="clear:both">
                <button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="mySubGroup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 70%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                <h4 class="modal-title">我的组件</h4>
            </div>
            <div class="modal-body" style="height: 386px;overflow-y: scroll">
                <div class="row"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary">确认</button>
            </div>
        </div>
    </div>
</div>
<script src="resources/js/lib/require.js" defer async="true" data-main="resources/js/app/designPanel"></script>
</body>

</html>
