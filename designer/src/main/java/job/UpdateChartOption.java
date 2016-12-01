package job;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.abel533.echarts.Option;
import common.util.TemplateUtil;
import model.chart.BuilderModel;
import model.chart.ChartBuilderParams;
import model.myPanel.MyCharts;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.cglib.proxy.Callback;
import org.springframework.context.ApplicationContext;
import service.chart.ChartOption;
import service.chart.bar.echarts.Bar;
import service.chart.line.echarts.Line;
import service.chart.pie.echarts.Pie;
import service.chart.pie.echarts.Ring;
import service.myPanel.MyChartsService;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;

/**
 * Created by ct on 2016/11/24.
 */
public class UpdateChartOption implements Job {

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        ObjectMapper mapper = new ObjectMapper();
        MyCharts myCharts = new MyCharts();
        ChartOption chartOption;
        //定时任务生成的option
        Option newOption = null;

        JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();
        //构造option所需的ChartBuilderParams对象参数
        ChartBuilderParams chartBuilderParams = new ChartBuilderParams();
        myCharts.setId((String) jobDataMap.get("chartId"));
        System.out.println("我的job在执行！");
        try {
            //获取spring上下文
            ApplicationContext applicationContext = (ApplicationContext) context.getScheduler().getContext().get("applicationContext");
            MyChartsService myChartsService = applicationContext.getBean(MyChartsService.class);
            MyCharts result = myChartsService.selectOneChartInfo(myCharts);

            String chartType = result.getChartType();
            String sqlRecordingId = result.getSqlRecordingId();
            BuilderModel builderModel = TemplateUtil.genObjFormJson(result.getBuildModel(), BuilderModel.class);

            chartBuilderParams.setChartType(ChartBuilderParams.ChartType.valueOf(chartType));
            chartBuilderParams.setDataRecordId(sqlRecordingId);
            chartBuilderParams.setBuilderModel(builderModel);
            //将数据库中的option相关的js代码转换为map形式备用
            Map option = mapper.readValue(result.getJsCode(), new TypeReference<Map<String, Object>>(){});
            if (chartBuilderParams.getChartType() == ChartBuilderParams.ChartType.pie) {
                chartOption = applicationContext.getBean(Pie.class);
                newOption = chartOption.transform(chartBuilderParams);
            } else if (chartBuilderParams.getChartType() == ChartBuilderParams.ChartType.line) {
                chartOption = applicationContext.getBean(Line.class);
                newOption = chartOption.transform(chartBuilderParams);
            } else if (chartBuilderParams.getChartType() == ChartBuilderParams.ChartType.bar) {
                chartOption = applicationContext.getBean(Bar.class);
                newOption = chartOption.transform(chartBuilderParams);
            } else if (chartBuilderParams.getChartType() == ChartBuilderParams.ChartType.ring) {
                chartOption = applicationContext.getBean(Ring.class);
                newOption = chartOption.transform(chartBuilderParams);
            }
            if(option.get("xAxis") != null) {
                if (option.get("xAxis") instanceof List) {
                    List<Map> xAxisList = (List<Map>) option.get("xAxis");
                    if (xAxisList.size() >= 1) {
                        Map xAxis = xAxisList.get(0);
                        xAxis.put("data", newOption.getxAxis().get(0).getData());
                    }
                }
            }
            if(option.get("legend") instanceof List){
                List<Map> legendList = (List<Map>) option.get("legend");
                if(legendList.size() >= 1){
                    Map legend = legendList.get(0);
                    legend.put("data", newOption.getLegend().getData());
                }
            }
            if(option.get("series") instanceof List){
                List<Map> seriesList = (List<Map>) option.get("series");
                if(seriesList.size() == 1){
                    Map series = seriesList.get(0);
                    series.put("data", newOption.getSeries().get(0).getData());
                }
            }
            myCharts.setJsCode(TemplateUtil.genJsonStr4Obj(option, true));
            myChartsService.update(myCharts);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
