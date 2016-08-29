package web.connectionManage;

import model.connectionManage.ConnectionManage;
import model.connectionManage.SqlRecordingManage;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.connectionManage.ConnectionManageService;
import service.connectionManage.SqlRecordingManageService;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by yx on 16/8/11.
 */
@Controller
@RequestMapping("/sqlRecordingManage")
public class SqlRecordingManageController {

    @Resource
    private ConnectionManageService connectionManageService;

    @Resource
    private SqlRecordingManageService sqlRecordingManageService;

    @RequestMapping("/crud")
    @ResponseBody
    public Object crud(@RequestHeader(required = true) String oper, SqlRecordingManage sqlRecordingManage){
        int res = -1;
        if("save".equals(oper)){
            res =  sqlRecordingManageService.add(sqlRecordingManage);
        }else if("update".equals(oper)){
            res =  sqlRecordingManageService.update(sqlRecordingManage);
        }else if("delete".equals(oper)){
            res = sqlRecordingManageService.delete(sqlRecordingManage);
        }
        return res;
    }


    @RequestMapping("/query")
    @ResponseBody
    public Object query(SqlRecordingManage sqlRecordingManage){
        return sqlRecordingManageService.query(sqlRecordingManage);
    }

    @RequestMapping("/queryTree")
    @ResponseBody
    @SuppressWarnings("unchecked")
    public Object queryTree(SqlRecordingManage sqlRecordingManage) throws Exception {
        String lv = sqlRecordingManage.getLv();
        List<ConnectionManage> treeNodes = new ArrayList();
        if("0".equals(lv)){
            String[] queryParams = sqlRecordingManage.getQueryParam().split(",");
            String connectionId = queryParams[0];
            sqlRecordingManage.setConnectionId(connectionId);
            sqlRecordingManage.setPaging(false);
            List<SqlRecordingManage> sqlRecordingManages = sqlRecordingManageService.query(sqlRecordingManage);
            for(SqlRecordingManage srm : sqlRecordingManages){
                ConnectionManage treeNode = new ConnectionManage();
                treeNode.setDbName(srm.getRecordingName());
                treeNode.setId(srm.getId());
                treeNode.setIsParent("false");
                treeNode.setSql(srm.getSqlRecording());
                treeNode.setType("sql");
                treeNodes.add(treeNode);
            }
        }else{
            ConnectionManage connectionManage = new ConnectionManage();
            BeanUtils.copyProperties(sqlRecordingManage,connectionManage);
            List<ConnectionManage> connectionManageList = connectionManageService.query(connectionManage);
            for(ConnectionManage cm : connectionManageList){
                String connectionId = cm.getId();
                sqlRecordingManage.setConnectionId(connectionId);
                sqlRecordingManage.setPaging(false);
                List<SqlRecordingManage> sqlRecordingManages = sqlRecordingManageService.query(sqlRecordingManage);
                if(sqlRecordingManages.size()>0){
                    treeNodes.add(cm);
                }
            }
        }
       return treeNodes;
    }
}
