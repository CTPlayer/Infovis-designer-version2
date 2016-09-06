package web;

import common.util.TemplateUtil;
import common.util.WebUtil;
import model.chart.ChartBuilderParams;
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
import service.chart.bar.echarts.Bar;
import service.chart.line.echarts.Line;
import service.chart.pie.echarts.Pie;
import service.myPanel.MyChartsService;
import service.myPanel.MyPanelService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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

    /**
     * 添加设计面板
     *
     * @param myPanel
     * @throws Exception
     */
    @RequestMapping("/addPanel")
    @ResponseBody
    public Object addPanel(MyPanel myPanel) throws Exception {
        return myPanelService.insert(myPanel);
    }

    /**
     * 显示设计面板
     *
     * @param exportId
     * @param map
     * @throws Exception
     */
    @RequestMapping("/showPanel.page")
    public Object showPanel(String exportId, ModelMap map) throws Exception {
        MyPanel myPanel = myPanelService.queryAsObject(exportId);
        map.addAttribute("exportId", myPanel.getExportId());
        map.addAttribute("htmlCode", myPanel.getHtmlCode());
        map.addAttribute("jsCode", myPanel.getJsCode());
        return "panel/designPanel";
    }

    /**
     * 保存当前设计面板并截取非实时预览图保存
     *
     * @param myPanel
     * @throws Exception
     */
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

    /**
     * 预览
     *
     * @param exportId
     * @param map
     * @throws Exception
     */
    @RequestMapping("/share.page")
    public Object share(String exportId, ModelMap map) throws Exception {
        MyPanel myPanel = myPanelService.queryAsObject(exportId);
        map.addAttribute("htmlCode", myPanel.getHtmlCode());
        return "export/exportTemplate";
    }

    /**
     * 获取预览图表配置
     *
     * @param cids
     * @throws Exception
     */
    @RequestMapping("/getShareOptions")
    @ResponseBody
    public Object getShareOptions(int[] cids,MyCharts myCharts) throws Exception{
        List<MyCharts> list = new ArrayList<>();
        for(int i=0;i<cids.length;i++){
            myCharts.setId(String.valueOf(cids[i]));
            list.add(myChartsService.selectOneChartInfo(myCharts));
        }
        return list;
    }

    /**
     * 跳转至主页面
     *
     * @throws Exception
     */
    @RequestMapping("/query.page")
    public Object query() throws Exception {
        return "panel/myPanel";
    }

    @RequestMapping("/dataAnalysis.page")
    public Object dataAnalysis() throws Exception {
        return "panel/dataAnalysis";
    }

    @RequestMapping("/sqlClient.page")
    public Object sqlClient() throws Exception {
        return "panel/sqlClient";
    }

    /**
     * 分页查询panel
     *
     * @param myPanel
     * @throws Exception
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

    /**
     * 删除一块设计面板
     *
     * @param exportId
     * @throws Exception
     */
    @RequestMapping("/deleteOne")
    @ResponseBody
    public Object deleteOne(String exportId) throws Exception {
        return myPanelService.delete(exportId);
    }

//    /**
//     * 根据exportId查询对应设计面板中所有的图表option
//     *
//     * @param exportId
//     * @throws Exception
//     */
//    @RequestMapping("/getOptions")
//    @ResponseBody
//    public Object getOptions(String exportId) throws Exception {
//        return myPanelService.queryAsObject(exportId);
//    }

//    /**
//     * 更新设计面板中的options
//     *
//     * @param myPanel
//     * @throws Exception
//     */
//    @RequestMapping("/updateOptions")
//    @ResponseBody
//    public Object updateOptions(MyPanel myPanel) throws Exception {
//        return myPanelService.update(myPanel);
//    }

    /**
     * 添加我的图表
     *
     * @param myCharts
     * @throws Exception
     */
    @RequestMapping("/addCharts")
    @ResponseBody
    public Object addCharts(MyCharts myCharts) throws  Exception{
        return myChartsService.insert(myCharts);
    }

    /**
     * 更新图表信息
     *
     * @param myCharts
     * @throws Exception
     */
    @RequestMapping("/updateChartInfo")
    @ResponseBody
    public Object updateChartInfo(MyCharts myCharts) throws Exception {
        return myChartsService.update(myCharts);
    }

    @RequestMapping("/selectOneChartInfo")
    @ResponseBody
    public Object selectOneChartInfo(MyCharts myCharts) throws Exception {
        myCharts =  myChartsService.selectOneChartInfo(myCharts);
        return myCharts;
    }

    /**
     * 查询所有图表信息
     *
     * @param myCharts
     * @throws Exception
     */
    @RequestMapping("/selectChartInfo")
    @ResponseBody
    public Object selectList(MyCharts myCharts) throws  Exception {
        myCharts.setPaging(false);
        Map<String, Object> respMap = new HashMap<>();
        respMap.put("data",myChartsService.selectChartInfo(myCharts));
        return respMap;
    }

    /**
     * 动态渲染图形
     *
     * @param chartBuilderParams
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/render", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
    @ResponseBody
    public Object render(@RequestBody ChartBuilderParams chartBuilderParams, HttpServletRequest request) throws Exception {

        WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(request.getServletContext());

        ChartOption chartOption = null;

        if (chartBuilderParams.getChartType() == ChartBuilderParams.ChartType.pie) {
            chartOption = context.getBean(Pie.class);
        } else if (chartBuilderParams.getChartType() == ChartBuilderParams.ChartType.line) {
            chartOption = context.getBean(Line.class);
        } else if (chartBuilderParams.getChartType() == ChartBuilderParams.ChartType.bar) {
            chartOption = context.getBean(Bar.class);
        }

        return TemplateUtil.genJsonStr4Obj(chartOption.transform(chartBuilderParams), true);
    }

}
