package web.connectionManage;

import model.connectionManage.ConnectionManage;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.connectionManage.ConnectionManageService;

import javax.annotation.Resource;

/**
 * Created by yx on 16/8/11.
 */
@Controller
@RequestMapping("/connectionManage")
public class ConnectionManageController {

    @Resource
    private ConnectionManageService connectionManageService;

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
}
