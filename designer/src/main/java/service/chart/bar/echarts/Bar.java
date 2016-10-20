/*************************************************************************
 * Copyright (C) Unpublished JiuDaoTech Software, Inc. All rights reserved.
 * JiuDaoTech Software, Inc., Confidential and Proprietary.
 * <p>
 * This software is subject to copyright protection
 * under the laws of the Public of China and other countries.
 * <p>
 * Unless otherwise explicitly stated, this software is provided
 * by JiuDaoTech "AS IS".
 *************************************************************************/
package service.chart.bar.echarts;

import com.github.abel533.echarts.Option;
import com.github.abel533.echarts.axis.Axis;
import com.github.abel533.echarts.axis.CategoryAxis;
import com.github.abel533.echarts.axis.ValueAxis;
import com.github.abel533.echarts.code.Trigger;
import com.github.abel533.echarts.series.Series;
import model.chart.ChartBuilderParams;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Transformer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import service.chart.ChartOption;
import service.chart.ChartsUtil;
import service.system.helper.DataSetProvider;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 标准柱状图实现
 *
 * @author CSJ
 */
@Service
public class Bar implements ChartOption {

    @Resource
    private DataSetProvider dataSetProvider;

    @Resource
    private ChartsUtil chartsUtil;

    @Override
    public Option transform(final ChartBuilderParams chartBuilderParams) throws Exception {

        List<Map<String, Object>> dataSet = dataSetProvider.prepareDataSet(chartBuilderParams);

        chartsUtil.dataFilter(dataSet,chartBuilderParams,"bar");

        // 拆分数据, 结构化
        Option option = new Option();
        // backgroundColor
        option.backgroundColor("white");
        // title
        option.title("标题", "副标题");
        // tooltip
        option.tooltip().trigger(Trigger.axis);
        // xAxis
        final Axis axis = new CategoryAxis();
        Collection<Map<String, Object>> xAxisData = CollectionUtils.collect(dataSet, new Transformer<Map<String, Object>, Map<String, Object>>() {
            @Override
            public Map<String, Object> transform(Map<String, Object> input) {
                Object obj = input.get(chartBuilderParams.getBuilderModel().getxAxis().get(0));
                Map<String, Object> category = new HashMap<>();
                if (obj != null && StringUtils.isNoneEmpty(obj.toString())) {
                    category.put("value", String.valueOf(obj));
                }
                return category;
            }
        });
        axis.data().addAll(xAxisData);
        option.xAxis().add(axis);
        option.yAxis().add(new ValueAxis());
        // series
        Series series = new com.github.abel533.echarts.series.Bar();
        Collection<Object> seriesData = CollectionUtils.collect(dataSet, new Transformer<Map<String, Object>, Object>() {
            @Override
            public Object transform(Map<String, Object> input) {
                Object v = input.get(chartBuilderParams.getBuilderModel().getyAxis().get(0));
                return v;
            }
        });
        series.data().addAll(seriesData);
        option.series(series);

        return option;
    }
}
