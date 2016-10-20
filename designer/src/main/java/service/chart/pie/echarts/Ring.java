package service.chart.pie.echarts;

import com.github.abel533.echarts.Option;
import com.github.abel533.echarts.code.Trigger;
import common.util.TemplateUtil;
import model.chart.ChartBuilderParams;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Transformer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import service.chart.ChartOption;
import service.chart.ChartsUtil;
import service.system.helper.DataSetProvider;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by ct on 2016/9/18.
 */
@Service
public class Ring implements ChartOption{

    @Resource
    private DataSetProvider dataSetProvider;

    @Resource
    private ChartsUtil chartsUtil;

    @Override
    public Option transform(final ChartBuilderParams chartBuilderParams) throws Exception {
        List<Map<String, Object>> dataSet = dataSetProvider.prepareDataSet(chartBuilderParams);

        chartsUtil.dataFilter(dataSet,chartBuilderParams,"ring");

        // 拆分数据, 结构化
        Option option = new Option();
        // backgroundColor
        option.backgroundColor("white");
        // title
        option.title("标题", "副标题");
        // tooltip
        option.tooltip().trigger(Trigger.item).formatter("{b}: {c} <br/>占比: {d}%");
        // legend
        Collection<String> legendData = CollectionUtils.collect(dataSet, new Transformer<Map<String, Object>, String>() {
            @Override
            public String transform(Map<String, Object> input) {
                Object obj = input.get(chartBuilderParams.getBuilderModel().getMark().getColor());
                if (obj != null && StringUtils.isNoneEmpty(obj.toString())) {
                    return String.valueOf(obj);
                }
                return "NULL";
            }
        }, new HashSet<String>());
        option.legend().data().addAll(legendData);
        //series
        com.github.abel533.echarts.series.Pie p = new com.github.abel533.echarts.series.Pie();
        Collection<Object> seriesData = CollectionUtils.collect(dataSet, new Transformer<Map<String, Object>, Object>() {
            @Override
            public Object transform(Map<String, Object> input) {
                Object v = input.get(chartBuilderParams.getBuilderModel().getMark().getAngle());
                Object k = input.get(chartBuilderParams.getBuilderModel().getMark().getColor());
                Map<String, Object> transformData = new HashMap<>();
                transformData.put("name", k);
                transformData.put("value", v);
                return transformData;
            }
        });
        p.radius("50%","70%");
        p.data().addAll(seriesData);
        option.series(p);
        return option;
    }
}
