package web.connectionManage;

import com.alibaba.druid.sql.SQLUtils;
import com.alibaba.druid.util.JdbcConstants;
import model.connectionManage.ConnectionManage;
import model.database.ColumnMetaData;
import model.database.JdbcProps;
import model.database.TableMetaData;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.connectionManage.ConnectionManageService;
import service.system.helper.DataBaseMetadataHelper;

import javax.annotation.Resource;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by yx on 16/8/11.
 */
@Controller
@RequestMapping("/connectionManage")
public class ConnectionManageController {

    @Resource
    private ConnectionManageService connectionManageService;

    @Resource
    private DataBaseMetadataHelper dataBaseMetadataHelper;

    @RequestMapping("/add")
    @ResponseBody
    public Object add(ConnectionManage connectionManage){
        return connectionManageService.add(connectionManage);
    }

    @RequestMapping("/delete")
    @ResponseBody
    public Object delete(ConnectionManage connectionManage){
        return connectionManageService.delete(connectionManage);
    }

    @RequestMapping("/query")
    @ResponseBody
    public Object query(ConnectionManage connectionManage){
        return connectionManageService.query(connectionManage);
    }

    @RequestMapping("/queryTree")
    @ResponseBody
    @SuppressWarnings("unchecked")
    public Object queryTree(ConnectionManage connectionManage) throws Exception {
        String lv = connectionManage.getLv();
        List<ConnectionManage> treeNodes = new ArrayList();
        if(StringUtils.isNotBlank(lv)){
            String[] queryParams = connectionManage.getQueryParam().split(",");
            connectionManage.setId(queryParams[0]);
            connectionManage = connectionManageService.queryAsObject(connectionManage);
            JdbcProps jdbcProps = new JdbcProps();
            jdbcProps.setUrl(connectionManage.getDbUrl());
            jdbcProps.setUsername(connectionManage.getUserName());
            jdbcProps.setPassword(connectionManage.getPassword());
            jdbcProps.setDbPort(connectionManage.getDbPort());
            jdbcProps.setDbHost(connectionManage.getDbHost());
            if("0".equals(lv)){
                if(dataBaseMetadataHelper.isEffectiveDataSouce(jdbcProps)){
                    List<TableMetaData> tableMetaDatas = dataBaseMetadataHelper.getSchemaTables(jdbcProps);
                    for(TableMetaData tableMetaData : tableMetaDatas){
                        ConnectionManage treeNode = new ConnectionManage();
                        treeNode.setDbName(tableMetaData.getTableName());
                        treeNode.setId(tableMetaData.getTableName());
                        treeNode.setIsParent("true");
                        treeNode.setQueryParam(connectionManage.getQueryParam().split(",")[0]+ "," + tableMetaData.getTableName());
                        treeNode.setType("table");
                        treeNodes.add(treeNode);
                    }
                }else{
                    throw new RuntimeException("数据库连接失败!");
                }
            }else if("1".equals(lv)){
                if(dataBaseMetadataHelper.isEffectiveDataSouce(jdbcProps)){
                    List<ColumnMetaData> columnMetaDatas = dataBaseMetadataHelper.getSchemaTableColumns(jdbcProps,queryParams[1]);
                    for(ColumnMetaData columnMetaData : columnMetaDatas){
                        ConnectionManage treeNode = new ConnectionManage();
                        treeNode.setDbName(columnMetaData.getColumnName() + ":" + columnMetaData.getJdbcType());
                        treeNode.setId(columnMetaData.getColumnName());
                        treeNode.setIsParent("false");
                        treeNode.setType("field");
                        treeNodes.add(treeNode);
                    }
                }else{
                    throw new RuntimeException("数据库连接失败!");
                }
            }
        }else{
            return connectionManageService.query(connectionManage);
        }
        return treeNodes;
    }

    @RequestMapping("/executeQuerySql")
    @ResponseBody
    public Object executeQuerySql(ConnectionManage connectionManage) throws Exception {
        Map<String,Object> resultSet = new HashMap<>();
        JdbcProps jdbcProps = new JdbcProps();
        jdbcProps.setSql(connectionManage.getSql());
        jdbcProps.setPage(connectionManage.getPage());
        jdbcProps.setPageSize(connectionManage.getPageSize());
        jdbcProps.setQueryMaxRows(connectionManage.getQueryMaxRows());

        connectionManage = connectionManageService.queryAsObject(connectionManage);
        jdbcProps.setUrl(connectionManage.getDbUrl());
        jdbcProps.setUsername(connectionManage.getUserName());
        jdbcProps.setPassword(connectionManage.getPassword());

        resultSet.put("data",dataBaseMetadataHelper.executeQuerySql(jdbcProps));
        resultSet.put("page",jdbcProps.getPage());
        resultSet.put("total",jdbcProps.getTotalPage());
        return resultSet;
    }

    @RequestMapping("/getQuerySqlInfo")
    @ResponseBody
    public Object getQuerySqlInfo(ConnectionManage connectionManage) throws Exception {
        JdbcProps jdbcProps = new JdbcProps();
        jdbcProps.setSql(connectionManage.getSql());
        jdbcProps.setPage(connectionManage.getPage());
        jdbcProps.setPageSize(connectionManage.getPageSize());
        jdbcProps.setQueryMaxRows(connectionManage.getQueryMaxRows());

        connectionManage = connectionManageService.queryAsObject(connectionManage);
        jdbcProps.setUrl(connectionManage.getDbUrl());
        jdbcProps.setUsername(connectionManage.getUserName());
        jdbcProps.setPassword(connectionManage.getPassword());
        return dataBaseMetadataHelper.getQuerySqlInfo(jdbcProps);
    }

    @RequestMapping("/formatSql")
    @ResponseBody
    public static String formatSql(ConnectionManage connectionManage) throws Exception {
        String dbType;
        switch (connectionManage.getDbType()) {
            case "MySql":
                dbType = JdbcConstants.MYSQL;
                break;
            case "SqlServer":
                dbType = JdbcConstants.SQL_SERVER;
                break;
            case "Oracle":
                dbType = JdbcConstants.ORACLE;
                break;
            default:
                dbType = JdbcConstants.MYSQL;
                break;
        }
        return SQLUtils.format(connectionManage.getSql(),dbType);
    }
}
