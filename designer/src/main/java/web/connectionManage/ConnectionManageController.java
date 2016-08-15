package web.connectionManage;

import core.plugin.spring.database.route.DynamicDataSource;
import model.connectionManage.ConnectionManage;
import model.database.JdbcProps;
import model.database.TableMetaData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.connectionManage.ConnectionManageService;
import service.system.helper.DataBaseMetadataHelper;

import javax.annotation.Resource;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

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
        if("0".equals(lv)){
            connectionManage.setId(connectionManage.getQueryParam());
            connectionManage = connectionManageService.queryAsObject(connectionManage);
            new Socket(connectionManage.getDbHost(),Integer.parseInt(connectionManage.getDbPort()));
            JdbcProps jdbcProps = new JdbcProps();
            jdbcProps.setUrl(connectionManage.getDbUrl());
            jdbcProps.setUsername(connectionManage.getUserName());
            jdbcProps.setPassword(connectionManage.getPassword());
            List<TableMetaData> tableMetaDatas = dataBaseMetadataHelper.getSchemaTables(jdbcProps);
            for(TableMetaData tableMetaData : tableMetaDatas){
                ConnectionManage treeNode = new ConnectionManage();
                treeNode.setDbName(tableMetaData.getTableName());
                treeNode.setId(tableMetaData.getTableName());
                treeNode.setIsParent("false");
                treeNodes.add(treeNode);
            }
        }else{
            return connectionManageService.query(connectionManage);
        }
        return treeNodes;
    }

    @RequestMapping("/executeQuerySql")
    @ResponseBody
    public Object executeQuerySql(ConnectionManage connectionManage) throws Exception {
        JdbcProps jdbcProps = new JdbcProps();
        jdbcProps.setSql(connectionManage.getSql());
        jdbcProps.setQueryMaxRows(connectionManage.getQueryMaxRows());
        connectionManage = connectionManageService.queryAsObject(connectionManage);
        jdbcProps.setUrl(connectionManage.getDbUrl());
        jdbcProps.setUsername(connectionManage.getUserName());
        jdbcProps.setPassword(connectionManage.getPassword());
        return dataBaseMetadataHelper.executeQuerySql(jdbcProps);
    }
}
