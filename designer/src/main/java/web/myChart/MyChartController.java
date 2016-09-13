package web.myChart;

import model.myPanel.MyCharts;
import model.myPanel.PanelChartsWrapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.myPanel.MyChartsService;
import service.myPanel.PanelChartsWrapperService;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Create time : 2016-09-09
 */
@Controller
@RequestMapping("/myChart")
public class MyChartController {

    @Resource
    private MyChartsService myChartsService;

    @Resource
    private PanelChartsWrapperService panelChartsWrapperService;

    @RequestMapping("/crud")
    @ResponseBody
    public Object crud(@RequestHeader(required = true) String oper, MyCharts myCharts) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        if ("insert".equals(oper)) {
            myChartsService.insert(myCharts);
        } else if ("update".equals(oper)) {
            myChartsService.update(myCharts);
        } else if ("delete".equals(oper)) {
            myChartsService.delete(myCharts);
            /**
             * 同时删除中间关联表信息
             */
            PanelChartsWrapper panelChartsWrapper = new PanelChartsWrapper();
            panelChartsWrapper.setChartId(myCharts.getId());
            panelChartsWrapperService.delete(panelChartsWrapper);
        }
        resMap.put("success", true);
        return resMap;
    }

    /**
     * 从我的图表中删除一条记录（需要先确认该图表未被使用）
     * @param panelChartsWrapper
     * @return
     * @throws Exception
     */
    @RequestMapping("/deleteOneChart")
    @ResponseBody
    public Object deleteOneChart(PanelChartsWrapper panelChartsWrapper) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        panelChartsWrapper.setPaging(false);
        List<PanelChartsWrapper> panelChartsWrappers = panelChartsWrapperService.selectList(panelChartsWrapper);
        if(panelChartsWrappers.size() > 0){
            resMap.put("isDelete",false);
        }else{
            MyCharts myCharts = new MyCharts();
            myCharts.setId(panelChartsWrapper.getChartId());
            myChartsService.delete(myCharts);
            resMap.put("isDelete",true);
        }
        return resMap;
    }
}
