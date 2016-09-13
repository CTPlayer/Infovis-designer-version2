require.config({
    baseUrl: 'resources/js',
    paths: {
        "jquery": "lib/bootstrap/js/jquery-2.1.4.min",
        "jquery-ui": "lib/jquery-ui.min",
        "jquery-layout": "lib/jquery.layout.min",
        "bootstrap": "lib/bootstrap/js/bootstrap.min",
        "ztree": "lib/ztree/js/jquery.ztree.all.min",
        "validate": "lib/jquery.validate.min",
        "knockout": "lib/knockout/knockout-3.4.0",
        "backbone": "lib/backbone/backbone-min",
        "knockback": "lib/knockback.min",
        "datatables.net": "lib/dataTables/js/jquery.dataTables.min",
        "DT-bootstrap": "lib/dataTables/js/dataTables.bootstrap.min",
        "underscore": "lib/underscore/underscore-min",
        "bootpag": "lib/bootpag/jquery.bootpag.min",
        "confirmModal": "lib/confirm/confirm-bootstrap"
    },
    shim : {
        "ztree" : { "deps" :['jquery'] },
        "codemirror_sql" : { "deps" :['codemirror'] },
        "jquery-ui" : { "deps" :['jquery'] },
        "jquery-layout" : { "deps" :['jquery','jquery-ui'] },
        "bootstrap" : { "deps" :['jquery'] },
        "gridstack" : { "deps" :['bootstrap', 'jquery-ui', 'lodash'] },
        "bootpag" : { "deps" :['jquery'] },
        "confirmModal" : { "deps" :['jquery'] }
    },
    packages: [{
        name: "codemirror",
        location: "lib/cm",
        main: "lib/codemirror"
    }]
});

require([
    "jquery",
    "codemirror",
    "codemirror/mode/sql/sql",
    "codemirror/addon/hint/show-hint",
    "codemirror/addon/hint/sql-hint",
    "codemirror/addon/mode/loadmode"
    ],function ($,codemirror) {
    $(function() {
        var editor = codemirror.fromTextArea($("#executeSql")[0], {
            mode: 'text/x-sql',
            indentWithTabs: true,
            smartIndent: true,
            lineNumbers: true,
            matchBrackets: true,
            autofocus: true,
            extraKeys: {"Ctrl-Space": "autocomplete"},
            hintOptions: {
                tables: {
                    users: {name: null, score: null, birthDate: null},
                    countries: {name: null, population: null, size: null}
                }
            }
        });
    });
})

require([
    'jquery',
    'bootstrap',
    'jquery-ui',
    'jquery-layout',
    'ztree',
    'validate',
    'knockout',
    'backbone',
    'knockback',
    'datatables.net',
    'DT-bootstrap',
    'bootpag',
    'confirmModal'],
    function($,bootstrap,jquery_ui,jquery_ayout,ztree,validate,ko,bo,kb,dataTables,DT_bootstrap,bootpag){
    $(function(){
        var outerLayout = $('body').layout({
            center__paneSelector:	".outer-center"
            ,   applyDefaultStyles: false
            ,	west__paneSelector:		".outer-west"
            ,	east__paneSelector:		".outer-east"
            ,	west__size:				350
            ,	east__size:				125
            ,	north__size:		    65
            ,	spacing_open:			2 // ALL panes
            ,	spacing_closed:			5 // ALL panes
            ,	north__spacing_open:	0
            ,	south__spacing_open:	0
            ,   resizerTip :            ""
            ,   togglerTip_open :          ""
            ,   togglerTip_closed :        ""
        });

        var middleLayout = $('div.outer-center').layout({
            center__paneSelector:	".middle-center"
            ,   applyDefaultStyles: false
            ,	west__paneSelector:		".middle-west"
            ,	east__paneSelector:		".middle-east"
            ,	west__size:				100
            ,	east__size:				100
            ,	spacing_open:			2  // ALL panes
            ,	spacing_closed:			5  // ALL panes
            ,   resizerTip :            ""
            ,   togglerTip_open :          ""
            ,   togglerTip_closed :        ""
        });

        var innerLayout = $('div.middle-center').layout({
            center__paneSelector:	".inner-center"
            ,   applyDefaultStyles: false
            ,	north__size:		    240
            ,	spacing_open:			2  // ALL panes
            ,	spacing_closed:			5  // ALL panes
            ,   resizerTip :            ""
            ,   togglerTip_open :          ""
            ,   togglerTip_closed :        ""
            ,   onresize_end: function (type,ob) {
                    if(type === 'north'){
                        $(".CodeMirror").height($(ob).height() - 50);
                    }
                    return true; // false = Cancel
                }
        });
        var setting = {
            async: {
                enable: true,
                url:"connectionManage/queryTree",
                autoParam:["queryParam", "level=lv"],
                dataType: "JSON",
                dataFilter: function(treeId, parentNode, responseData) {
                    //批量增加iconSkin
                    $.each(responseData,function(index,object){
                        if(object.type === 'database'){
                            switch(object.dbType)
                            {
                                case 'Oracle':
                                    object.iconSkin = "oracleIcon";
                                    break;
                                case 'MySql':
                                    object.iconSkin = "mysqlIcon";
                                    break;
                                case 'SqlServer':
                                    object.iconSkin = "sqlserverIcon";
                                    break;
                                case 'H2':
                                    object.iconSkin = "h2Icon";
                                    break;
                                default:
                                    object.iconSkin = "dbIcon";
                            }

                        }else if((object.type === 'table')){
                            object.iconSkin = "tableIcon";
                        }else{
                            object.iconSkin = "fieldIcon";
                        }
                    });
                    return responseData;
                }
            },
            data: {
                key: {
                    name: "dbName"
                }
            },
            callback: {
                onAsyncError: function (event,treeId,treeNode,XMLHttpRequest,textStatus,errorThrown) {
                    //记录旧的节点名称以免重复增加无法连接
                    if(!treeNode.oldDbName){
                        treeNode.oldDbName = treeNode.dbName;
                    }
                    treeNode.dbName = treeNode.oldDbName +"(无法连接)"
                    dataSourceTree.updateNode(treeNode);
                },
                onClick: function(event, treeId, treeNode) {
                    queryParam.accordingType = 'dataSource';
                    if(treeNode.level === 1){
                        var editor = $('.CodeMirror')[0].CodeMirror;
                        var sql = editor.getDoc().getValue();
                        if(sql === ''){
                            editor.replaceSelection("select * from " + treeNode.dbName);
                        }else{
                            editor.replaceSelection(" " + treeNode.dbName);
                        }
                    }
                }
            }
        };

        var dataSourceTree = $.fn.zTree.init($("#dataSourceTree"),setting);
        var setting_datalist = {
            async: {
                enable: true,
                url:"sqlRecordingManage/queryTree",
                autoParam:["queryParam", "level=lv"],
                dataType: "JSON",
                dataFilter: function(treeId, parentNode, responseData) {
                    //批量增加iconSkin
                    $.each(responseData,function(index,object){
                        if(object.type === 'database'){
                            switch(object.dbType)
                            {
                                case 'Oracle':
                                    object.iconSkin = "oracleIcon";
                                    break;
                                case 'MySql':
                                    object.iconSkin = "mysqlIcon";
                                    break;
                                case 'SqlServer':
                                    object.iconSkin = "sqlserverIcon";
                                    break;
                                case 'H2':
                                    object.iconSkin = "h2Icon";
                                    break;
                                default:
                                    object.iconSkin = "dbIcon";
                            }

                        }else{
                            object.iconSkin = "tableIcon";
                        }
                    });
                    return responseData;
                }
            },
            data: {
                key: {
                    name: "dbName"
                }
            },
            callback: {
                onAsyncError: function (event,treeId,treeNode,XMLHttpRequest,textStatus,errorThrown) {
                    //记录旧的节点名称以免重复增加无法连接
                    if(!treeNode.oldDbName){
                        treeNode.oldDbName = treeNode.dbName;
                    }
                    treeNode.dbName = treeNode.oldDbName +"(无法连接)"
                    setting_datalist.updateNode(treeNode);
                },
                onClick: function(event, treeId, treeNode) {
                    queryParam.accordingType = 'dataList';
                    if(treeNode.level === 1){
                        var editor = $('.CodeMirror')[0].CodeMirror;
                        editor.getDoc().setValue("");
                        editor.replaceSelection(treeNode.sql);
                        if(editor.getDoc().getValue() != ''){
                            excuteSqlFunction();
                        }
                        $('#sqlResultId').html(treeNode.id);
                        $('#sqlRecordingName').html(treeNode.dbName);
                    }
                }
            }
        };

        var dataListTree = $.fn.zTree.init($("#dataListTree"),setting_datalist);


        //删除
        $("#deleteDB").click(function(){
            var nodes = dataSourceTree.getSelectedNodes();
            if(nodes.length != 1){
                $("#isCheckModal").modal('toggle');
            }else if(!nodes[0].dbUrl){
                $("#onlyDBModal").modal('toggle');
            }else{
                $("#isDeleteModal").modal('toggle');
            }
        })
        //确认删除
        $("#isDeleteModal .btn-primary").click(function(){
            var nodes = dataSourceTree.getSelectedNodes();
            var deferred = $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'connectionManage/delete',
                data : 'id=' + nodes[0].id
            });
            $("#isDeleteModal").modal('toggle');
            deferred.done(function(){
                dataSourceTree.reAsyncChildNodes(null, "refresh");
            })

        });

        //新增保存
        $("#addConnectionModal .btn-primary").click(function(){
            $('#addConnectionForm').submit();
        })

        $('#addConnectionForm').validate({
            errorElement : 'div',
            errorClass : 'warning-block',
            focusInvalid : true,
            ignore : "",
            rules : {
                dbType : {
                    required : true
                },
                dbHost : {
                    required : true,
                },
                dbPort : {
                    required : true,
                },
                dbName : {
                    required : true,
                    maxlength:300
                },
                dbUrl : {
                    required : true,
                    maxlength:300
                },
                userName : {
                    required : true,
                    maxlength:300
                },
                password : {
                    required : true,
                    maxlength:300
                }
            },
            messages : {
                dbType : {
                    required : "数据库连接地址为必选项"
                },
                dbHost : {
                    required : "数据库主机地址为必填项",
                },
                dbPort : {
                    required : "数据库端口号为必填项",
                },
                dbName : {
                    required : "数据库名称地址为必填项",
                    maxlength: "最大长度为300个字符"
                },
                dbUrl : {
                    required : "数据库连接地址为必填项",
                    maxlength:"最大长度为300个字符"
                },
                userName : {
                    required : "数据库用户名为必填项",
                    maxlength:"最大长度为300个字符"
                },
                password : {
                    required : "数据库密码地址为必填项",
                    maxlength:"最大长度为300个字符"
                }
            },
            submitHandler : function(form) {
                var deferred = $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: 'connectionManage/add',
                    data : $(form).serialize()
                });
                deferred.done(function(){
                    $(form)[0].reset();
                    $("#addConnectionModal").modal('toggle');
                    dataSourceTree.reAsyncChildNodes(null, "refresh");
                })
            }
        })

        var queryParam = {};

        var excuteSqlFunction = function () {
            var nodes ;
            if(queryParam.accordingType == 'dataSource'){
                nodes = dataSourceTree.getSelectedNodes();
            }else if(queryParam.accordingType == 'dataList'){
                nodes = dataListTree.getSelectedNodes();
            }

            if(nodes.length != 1){
                $("#isCheckDataSourceModal").modal('toggle');
            }else{
                var editor = $('.CodeMirror')[0].CodeMirror;
                if(editor.getDoc().getSelection() === "") {
                    queryParam.sql = editor.getDoc().getValue();
                }else{
                    queryParam.sql = editor.getDoc().getSelection();
                }
                queryParam.pageSize = 30;
                queryParam.page = 1;
                //去除换行符
                queryParam.sql = queryParam.sql.replace(/[\r\n]/g,' ');
                queryParam.queryMaxRows = 30;


                var parentNode = nodes[0];
                //循环找到根节点
                while(parentNode.getParentNode())
                {
                    parentNode = parentNode.getParentNode();
                }


                queryParam.id = parentNode.id;

                var deferred = $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: 'connectionManage/executeQuerySql',
                    data : queryParam
                });
                deferred.done(function(result){
                    $('#pagebar').empty();
                    if(queryParam.accordingType == 'dataSource'){
                        $('#savebar').show();
                        $('#sqlresultbargroup').hide();
                    }else if(queryParam.accordingType == 'dataList'){
                        $('#savebar').hide();
                        $('#sqlresultbargroup').show();
                    }

                    $('#pagebar').bootpag({
                        total: result.total,
                        page: result.page,
                        maxVisible: 5
                    }).on("page", function(event, num){
                        queryParam.page = num;
                        var pageDeferred = $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: 'connectionManage/executeQuerySql',
                            data : queryParam
                        });
                        pageDeferred.done(function(result){
                            randerTable(result.data)
                        });
                    })
                    randerTable(result.data);
                })

                var randerTable = function (result) {
                    $("#resultArea").empty();
                    $("#resultArea").append("<table class='display' cellspacing='0' width='100%'><thead></thead><tbody></tbody></table>");
                    $.each(result,function(RowIndex,row){
                        var tr=$("<tr></tr>");
                        $.each(row,function(colIndex,col){
                            if(RowIndex == 0){
                                tr.append("<th>"+ htmlEncode(col) +"</th>")
                            }else {
                                tr.append("<td>" + htmlEncode(col) + "</td>")
                            }
                        })
                        if(RowIndex == 0) {
                            $("#resultArea table thead").append(tr);
                        }else{
                            $("#resultArea table tbody").append(tr);
                        }
                    });
                    $('#resultArea table').DataTable({
                        paging: false,
                        searching: false,
                        "language": {
                            "zeroRecords": "没有查询到记录",
                            "info": "",
                            "infoEmpty": ""
                        }
                    });
                }

                deferred.fail(function(result){
                    $("#resultArea").empty();
                    $("#resultArea").append(result.responseText)
                })
                function htmlEncode(str) {
                    var div = document.createElement("div");
                    div.appendChild(document.createTextNode(str));
                    return div.innerHTML;
                }
            }
        }

        //点击查询只查询第一页后面由分页插件去查询
        $("#executeQuerySql").click(function(e){
            excuteSqlFunction();
        })

        //格式化sql
        $("#formattSelectSql").click(function() {
            var editor = $('.CodeMirror')[0].CodeMirror;
            var nodes = dataSourceTree.getSelectedNodes();
            var queryParam = {sql: "", dbType: ""};
            var isSelection = false;
            if(nodes.length != 1){
                $("#isCheckDataSourceModal").modal('toggle');
            }else {
                //如果没有选中则格式化全部
                if (editor.getDoc().getSelection() === "") {
                    queryParam.sql = editor.getDoc().getValue();
                } else {
                    queryParam.sql = editor.getDoc().getSelection();
                    isSelection = true;
                }
                queryParam.dbType = nodes[0].dbType;
                var formatSelectSqlDeferred = $.ajax({
                    type: 'POST',
                    dataType: 'text',
                    url: 'connectionManage/formatSql',
                    data: queryParam
                });

                formatSelectSqlDeferred.done(function(result){
                    if(isSelection) {
                        editor.replaceSelection(result);
                    }else{
                        editor.getDoc().setValue(result);
                    }
                });
            }
        })

        //清空sql
        $("#clearSql").click(function() {
            var editor = $('.CodeMirror')[0].CodeMirror;
            editor.setValue("");
            //editor.clearHistory();

        })

        //保存sql
        $("#saveQuerySql").click(function() {
            queryParam.oper = 'save';
            $('#saveQuerySqlForm').find("input[name='recordingName']").val('');
            $('#saveQuerySqlModal .modal-title').html('保存数据集');
            $("#saveQuerySqlModal").modal('toggle');
        })

        //更新sql
        $("#updateSqlResultBar").click(function() {
            queryParam.oper = 'update';
            queryParam.sqlRecordId = $('#sqlResultId').html();
            var editor = $('.CodeMirror')[0].CodeMirror;
            if(editor.getDoc().getSelection() === "") {
                queryParam.sql = editor.getDoc().getValue();
            }else{
                queryParam.sql = editor.getDoc().getSelection();
            }
            $('#saveQuerySqlModal .modal-title').html('更新数据集');
            $("#saveQuerySqlModal").modal('toggle');
            $('#saveQuerySqlForm').find("input[name='recordingName']").val($('#sqlRecordingName').html());
        })

        //新增保存
        $("#saveQuerySqlModal .btn-primary").click(function(){
            $('#saveQuerySqlForm').submit();
        });

        $('#saveQuerySqlForm').validate({
            errorElement : 'div',
            errorClass : 'warning-block',
            focusInvalid : true,
            ignore : "",
            rules : {
                recordingName : {
                    required : true
                }
            },
            messages : {
                recordingName : {
                    required : "数据集名称为必填项"
                }
            },
            submitHandler : function(form) {
                var recordingName = $(form).find("input[name='recordingName']").val();
                var data = {
                    "recordingName" : recordingName,
                    "connectionId" : queryParam.id,
                    "sqlRecording" : queryParam.sql,
                    "id":queryParam.sqlRecordId
                };

                var deferred = $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: 'sqlRecordingManage/crud',
                    data : data,
                    headers :{
                        oper : queryParam.oper
                    }
                });
                deferred.done(function(){
                    $(form)[0].reset();
                    $("#saveQuerySqlModal").modal('toggle');
                    $.fn.zTree.init($("#dataListTree"),setting_datalist);
                })
            }
        });

        /**
         * 删除结果集
         */
        $('#deleteSqlResultBar').confirmModal({
            confirmTitle     : '提示',
            confirmMessage   : '你确定删除该结果集 ?',
            confirmOk        : '是的',
            confirmCancel    : '取消',
            confirmDirection : 'rtl',
            confirmStyle     : 'primary',
            confirmCallback  : function () {
                var deferred = $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: 'sqlRecordingManage/crud',
                    data : {
                        id:$('#sqlResultId').html()
                    },
                    headers :{
                        oper : 'delete'
                    }
                });
                deferred.done(function(){
                    $.fn.zTree.init($("#dataListTree"),setting_datalist);
                })
            },
            confirmDismiss   : true,
            confirmAutoOpen  : false
        });

        //打开模态框绑定数据
        $('#addConnectionModal').on('show.bs.modal', function () {
            ko.cleanNode($('#addConnectionModel')[0]);
            var addConnectionModel = new Backbone.Model(
                {
                    dbType: "MySql",
                    dbHost: "",
                    dbPort: "3306",
                    dbName: ""
                });
            var addConnectionViewModel = function(model) {
                this.dbType = kb.observable(model, 'dbType');
                this.dbHost = kb.observable(model, 'dbHost');
                this.dbPort = kb.observable(model, 'dbPort');
                this.dbName = kb.observable(model, 'dbName');
                this.changeType = function(){
                    var port = {
                        MySql:"3306",
                        SqlServer:"1433",
                        Oracle:"1521"
                    }
                    this.dbPort(port[this.dbType()]);
                };
                this.dbUrl = ko.computed((function() {
                    return buildUrl(this.dbType(),this.dbHost(),this.dbPort(),this.dbName());
                }), this);
            };
            var buildUrl = function(dbType,dbHost,dbPort,dbName){
                var UrlTemplate = {
                    MySql:"jdbc:mysql://{dbHost}:{dbPort}/{dbName}",
                    SqlServer:"jdbc:sqlserver://{dbHost}:{dbPort};databaseName={dbName}",
                    Oracle:"jdbc:oracle:thin:@//{dbHost}:{dbPort}/{dbName}"
                }
                var template = UrlTemplate[dbType];
                return template.replace(/{dbHost}/,dbHost).replace(/{dbPort}/,dbPort).replace(/{dbName}/,dbName);
            }
            var model = new addConnectionViewModel(addConnectionModel);
            ko.applyBindings(model, $('#addConnectionModel')[0]);
        })
    });
})