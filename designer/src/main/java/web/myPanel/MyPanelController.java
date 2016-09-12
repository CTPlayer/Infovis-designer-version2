package web.myPanel;

import model.myPanel.MyPanel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.myPanel.MyPanelService;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * Create time : 2016-09-08
 */
@Controller
@RequestMapping("/myPanel")
public class MyPanelController {

    @Resource
    private MyPanelService myPanelService;

    @RequestMapping("/crud")
    @ResponseBody
    public Object crud(@RequestHeader(required = true) String oper, MyPanel myPanel) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        if ("insert".equals(oper)) {
            myPanelService.insert(myPanel);
        } else if ("update".equals(oper)) {
            myPanelService.update(myPanel);
        } else if ("delete".equals(oper)) {
            myPanelService.delete(myPanel.getExportId());
        } else if ("query".equals(oper)) {
            myPanel = myPanelService.queryAsObject(myPanel.getExportId());
        }
        resMap.put("success", true);
        resMap.put("myPanel", myPanel);
        return resMap;
    }
}
