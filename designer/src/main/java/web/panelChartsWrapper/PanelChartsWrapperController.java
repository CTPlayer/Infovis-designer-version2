package web.panelChartsWrapper;

import com.alibaba.druid.support.json.JSONUtils;
import model.myPanel.PanelChartsWrapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.myPanel.PanelChartsWrapperService;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ct on 2016/9/12.
 */
@Controller
@RequestMapping("/panelChartsWrapper")
public class PanelChartsWrapperController {

    @Resource
    private PanelChartsWrapperService panelChartsWrapperService;

    @RequestMapping("/crud")
    @ResponseBody
    public Object crud(@RequestHeader(required = true) String oper, PanelChartsWrapper panelChartsWrapper) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        if ("insert".equals(oper)) {
            panelChartsWrapperService.insert(panelChartsWrapper);
        } else if ("delete".equals(oper)) {
            panelChartsWrapperService.delete(panelChartsWrapper);
        }
        resMap.put("success", true);
        return resMap;
    }

    @RequestMapping("updateWrapper")
    @ResponseBody
    public Object updateWrapper(int[] chartIds,int[] containerIds,PanelChartsWrapper panelChartsWrapper) throws Exception{
        Map<String, Object> resMap = new HashMap<>();
        panelChartsWrapperService.delete(panelChartsWrapper);
        for(int i=0;i<chartIds.length;i++){
            panelChartsWrapper.setOrderId(String.valueOf(containerIds[i]));
            panelChartsWrapper.setChartId(String.valueOf(chartIds[i]));
            panelChartsWrapperService.insert(panelChartsWrapper);
        }
        resMap.put("success", true);
        return resMap;
    }
}
