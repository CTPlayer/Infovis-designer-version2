package web.connectionManage;

import model.connectionManage.ConnectionManage;
import model.connectionManage.SqlRecordingManage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.connectionManage.ConnectionManageService;
import service.connectionManage.SqlRecordingManageService;

import javax.annotation.Resource;

/**
 * Created by yx on 16/8/11.
 */
@Controller
@RequestMapping("/sqlRecordingManage")
public class SqlRecordingManageController {

    @Resource
    private SqlRecordingManageService sqlRecordingManageService;

    @RequestMapping("/add")
    @ResponseBody
    public Object add(SqlRecordingManage sqlRecordingManage){
        return sqlRecordingManageService.add(sqlRecordingManage);
    }

    @RequestMapping("/delete")
    @ResponseBody
    public Object delete(SqlRecordingManage sqlRecordingManage){
        return sqlRecordingManageService.delete(sqlRecordingManage);
    }

    @RequestMapping("/query")
    @ResponseBody
    public Object query(SqlRecordingManage sqlRecordingManage){
        return sqlRecordingManageService.query(sqlRecordingManage);
    }
}
