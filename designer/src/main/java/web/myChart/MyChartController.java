package web.myChart;

import job.UpdateChartOption;
import model.chart.ChartBuilderParams;
import model.connectionManage.SqlRecordingManage;
import model.myPanel.MyCharts;
import model.myPanel.PanelChartsWrapper;
import org.quartz.*;
import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import service.chart.ChartsUtil;
import service.connectionManage.SqlRecordingManageService;
import service.myPanel.MyChartsService;
import service.myPanel.PanelChartsWrapperService;
import service.quartz.QuartzService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
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

    @Resource
    private QuartzService quartzService;

    @Resource
    private Scheduler quartzScheduler;

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
     * 从我的图表中删除一条记录（需要先确认该图表未被使用, 同时删除对应的定时任务）
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
            String group = myChartsService.selectOneChartInfo(myCharts).getChartType();
            myChartsService.delete(myCharts);
            quartzService.removeJob(myCharts.getId(), group);
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
        for(int i=0;i<list.size();i++){
            map01.put(list.get(i).getDataRecordId(), chartsUtil.getChartResult(list.get(i)));
        }
        return map01;
    }

    /**
     * 添加quartz定時任務
     * @param chartId
     * @param startTime
     * @param period
     * @param triggerName
     * @param triggerGroup
     * @return
     * @throws Exception
     */
    @RequestMapping("/addSchedulerJob")
    @ResponseBody
    public Object addSchedulerJob(String chartId, String chartType, String startTime, String period, String triggerName, String triggerGroup) throws Exception{
        Map<String, Object> resMap = new HashMap<>();
        Map<String, Object> param = new HashMap<>();

        param.put("chartId", chartId);

        Trigger trigger = quartzService.generateTrigger(startTime, period, triggerName, triggerGroup);
        quartzService.addJob(UpdateChartOption.class, chartId, chartType, trigger, param);
        quartzService.startJobs();
        resMap.put("success", true);
        return resMap;
    }

    /**
     * 获取当前定时任务信息
     * @param triggerName
     * @return
     */
    @RequestMapping("/getSchedulerInfo")
    @ResponseBody
    public Object getSchedulerInfo(String triggerName, String triggerGroup) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Trigger trigger = quartzScheduler.getTrigger(TriggerKey.triggerKey(triggerName, triggerGroup));
        if(trigger != null){
            Date startTime = trigger.getStartTime();
            Date nextTime = trigger.getNextFireTime();
            Date previousTime = trigger.getPreviousFireTime();
            String period = "";

            long timeDiff = 0;
            if(nextTime.getTime() > previousTime.getTime()){
                timeDiff = nextTime.getTime() - previousTime.getTime();
            }
            long days = timeDiff/(1000*60*60*24);
            if(days < 7){
                period = "day";
            }else if(days > 7 || days == 7 && days < 31){
                period = "week";
            }else if(days > 31 || days == 31){
                period = "month";
            }

            resMap.put("haveJob", true);
            resMap.put("startTime", sdf.format(startTime));
            resMap.put("period", period);
        }else {
            resMap.put("haveJob", false);
        }

        return resMap;
    }

    /**
     * 暂停指定任务
     * @param jobName
     * @param jobGroup
     * @return
     * @throws Exception
     */
    @RequestMapping("/pauseJob")
    @ResponseBody
    public Object pauseJob(String jobName, String jobGroup) throws Exception{
        Map<String, Object> resMap = new HashMap<>();
        if(quartzScheduler.getJobDetail(JobKey.jobKey(jobName, jobGroup)) != null){
            quartzService.pauseJob(JobKey.jobKey(jobName, jobGroup));
            resMap.put("success", true);
        }else {
            resMap.put("fail", "can not find the job!");
        }
        return resMap;
    }

    /**
     * 恢复指定任务
     * @param jobName
     * @param jobGroup
     * @return
     * @throws Exception
     */
    @RequestMapping("/resumeJob")
    @ResponseBody
    public Object resumeJob(String jobName, String jobGroup) throws Exception{
        Map<String, Object> resMap = new HashMap<>();
        if(quartzScheduler.getJobDetail(JobKey.jobKey(jobName, jobGroup)) != null){
            quartzService.resumeJob(JobKey.jobKey(jobName, jobGroup));
            resMap.put("success", true);
        }else {
            resMap.put("fail", "can not find the job!");
        }
        return resMap;
    }

    /**
     * 重新设置定时任务
     * @param startTime
     * @param period
     * @param triggerName
     * @param triggerGroup
     * @return
     * @throws Exception
     */
    @RequestMapping("/retScheduleJob")
    @ResponseBody
    public Object retScheduleJob(String startTime, String period, String triggerName, String triggerGroup) throws Exception{
        Map<String, Object> resMap = new HashMap<>();
        quartzService.retScheduleJob(TriggerKey.triggerKey(triggerName, triggerGroup), startTime, period);
        resMap.put("success", true);
        return resMap;
    }

    /**
     * 删除指定定时任务
     * @param name
     * @param group
     * @return
     */
    @RequestMapping("/removeJob")
    @ResponseBody
    public Object removeJob(String name, String group) throws Exception{
        Map<String, Object> resMap = new HashMap<>();
        quartzService.removeJob(name, group);
        resMap.put("success", true);
        return resMap;
    }
}
