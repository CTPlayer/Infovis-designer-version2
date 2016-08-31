package web;

import common.util.TemplateUtil;
import common.util.WebUtil;
import model.chart.ChatBuilderParams;
import model.myPanel.MyCharts;
import model.myPanel.MyPanel;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import service.chart.ChartOption;
import service.chart.line.echarts.Line;
import service.chart.pie.echarts.Pie;
import service.myPanel.MyChartsService;
import service.myPanel.MyPanelService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ct on 2016/8/18.
 */
@Controller
public class DefaultController {

    @Resource
    private MyPanelService myPanelService;

    @Resource
    private MyChartsService myChartsService;

    @RequestMapping("/addPanel")
    @ResponseBody
    public Object addPanel(MyPanel myPanel) throws Exception {
        return myPanelService.insert(myPanel);
    }

    @RequestMapping("/showPanel.page")
    public Object showPanel(String exportId, ModelMap map) throws Exception {
        MyPanel myPanel = myPanelService.queryAsObject(exportId);
        map.addAttribute("exportId", myPanel.getExportId());
        map.addAttribute("htmlCode", myPanel.getHtmlCode());
        map.addAttribute("jsCode", myPanel.getJsCode());
        return "panel/designPanel";
    }

    @RequestMapping("/export")
    @ResponseBody
    public Object export(MyPanel myPanel) throws Exception {
        myPanelService.update(myPanel);
        String snapshotImg = WebUtil.snapshotHtmlImageBase64Format(myPanel.getExtraMsg(), myPanel.getExportId());
        MyPanel panel = new MyPanel();
        panel.setExportId(myPanel.getExportId());
        panel.setImg(snapshotImg);
        return myPanelService.update(panel);
    }

    @RequestMapping("/share.page")
    public Object share(String exportId, ModelMap map) throws Exception {
        MyPanel myPanel = myPanelService.queryAsObject(exportId);
        map.addAttribute("htmlCode", myPanel.getHtmlCode());
        map.addAttribute("jsCode", myPanel.getJsCode());
        return "export/exportTemplate";
    }

    @RequestMapping("/query.page")
    public Object query() throws Exception {
        return "panel/myPanel";
    }

    /*
     *分页查询panel
     */
    @RequestMapping("/selectList")
    @ResponseBody
    public Object selectList(MyPanel myPanel) throws Exception {
        myPanel.setPageSize(myPanel.getPageSize());
        myPanel.setPage(myPanel.getPage());
        Map<String, Object> respMap = new HashMap<>();
        respMap.put("data", myPanelService.queryAsList(myPanel));
        respMap.put("totalPage", myPanel.getTotalPage());
        return respMap;
    }

    @RequestMapping("/deleteOne")
    @ResponseBody
    public Object deleteOne(String exportId) throws Exception {
        return myPanelService.delete(exportId);
    }

    /*
     *根据exportId返回对应的图表options
     */
    @RequestMapping("/getOptions")
    @ResponseBody
    public Object getOptions(String exportId) throws Exception {
        return myPanelService.queryAsObject(exportId);
    }

    /*
     *更新options
     */
    @RequestMapping("/updateOptions")
    @ResponseBody
    public Object updateOptions(MyPanel myPanel) throws Exception {
        return myPanelService.update(myPanel);
    }

    @RequestMapping("/insertChartInfo")
    @ResponseBody
    public Object insertChartInfo(MyCharts myCharts) throws  Exception {
        return myChartsService.insert(myCharts);
    }

    @RequestMapping("/deleteChartInfo")
    @ResponseBody
    public Object deleteChartInfo(MyCharts myCharts) throws Exception{
        return myChartsService.delete(myCharts);
    }

    /**
     * 动态渲染图形
     *
     * @param chatBuilderParams
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/render", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
    @ResponseBody
    public Object render(@RequestBody ChatBuilderParams chatBuilderParams, HttpServletRequest request) throws Exception {

        WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(request.getServletContext());

        ChartOption chartOption = null;

        if (chatBuilderParams.getChartType() == ChatBuilderParams.ChartType.pie) {
            chartOption = context.getBean(Pie.class);
        } else if (chatBuilderParams.getChartType() == ChatBuilderParams.ChartType.line) {
            chartOption = context.getBean(Line.class);
        }

        return TemplateUtil.genJsonStr4Obj(chartOption.transform(chatBuilderParams), true);
    }

}
