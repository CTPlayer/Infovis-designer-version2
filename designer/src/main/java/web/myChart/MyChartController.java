package web.myChart;

import model.chart.ChartBuilderParams;
import model.connectionManage.SqlRecordingManage;
import model.myPanel.MyCharts;
import model.myPanel.PanelChartsWrapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.chart.ChartsUtil;
import service.connectionManage.SqlRecordingManageService;
import service.myPanel.MyChartsService;
import service.myPanel.PanelChartsWrapperService;

import javax.annotation.Resource;
import java.util.*;

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

    @Resource
    private ChartsUtil chartsUtil;

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

    /**
     * 获取筛选字段的信息
     *
     * @param chartBuilderParams
     * @return
     * @throws Exception
     */
    @RequestMapping("/getFilterResult")
    @ResponseBody
    public Object getFilterResult(@RequestBody ChartBuilderParams chartBuilderParams) throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("filterResult",chartsUtil.getFilterResult(chartBuilderParams));
        return map;
    }

    /**
     * 接受一组ChartBuilderParams，并返回筛选过滤信息
     * @param list
     * @return
     * @throws Exception
     */
    @RequestMapping("/getFilterResultOfList")
    @ResponseBody
    public Object getFilterResultOfList(@RequestBody List<ChartBuilderParams> list) throws Exception {
        List result = new ArrayList<>();
        for(int i=0;i<list.size();i++){
//            Map<String, Object> map = new HashMap<>();
//            map.put("filterResult",chartsUtil.getChartResult(list.get(i)));
//            maps.add(map);
            result.add(chartsUtil.getChartResult(list.get(i)));
        }
        return result;
    }

    /**
     * 多图表获取字段的信息
     * @param list
     * @return
     * @throws Exception
     */
    @RequestMapping("/getFilterResults")
    @ResponseBody
    public Object getFilterResults(@RequestBody List<ChartBuilderParams> list) throws Exception{
        Map<String, Object> map01 = new HashMap<>();
//        Map<String, Object> map02 = new HashMap<>();
        for(int i=0;i<list.size();i++){
            map01.put(list.get(i).getDataRecordId(), chartsUtil.getChartResult(list.get(i)));
        }
//        Set<String> keySet = map01.keySet();
//        for(String s : keySet){
//            SqlRecordingManage sqlRecordingManage = new SqlRecordingManage();
//            sqlRecordingManage.setId(s);
//            String recordingName = sqlRecordingManageService.queryAsObject(sqlRecordingManage).getRecordingName().toString();
//            map02.put(recordingName, map01.get(s));
//        }
        return map01;
    }
}
