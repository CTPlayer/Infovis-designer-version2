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
package service.chart.pie.echarts;

import com.github.abel533.echarts.Option;
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
import java.util.*;

/**
 * 标准饼图实现
 *
 * @author CSJ
 */
@Service
public class Pie implements ChartOption {

    @Resource
    private DataSetProvider dataSetProvider;

    @Resource
    private ChartsUtil chartsUtil;

    @Override
    public Option transform(final ChartBuilderParams chartBuilderParams) throws Exception {

        List<Map<String, Object>> dataSet = dataSetProvider.prepareDataSet(chartBuilderParams);

        chartsUtil.dataFilter(dataSet,chartBuilderParams,"pie");

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
        // series
        Series series = new com.github.abel533.echarts.series.Pie();
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
        series.data().addAll(seriesData);
        option.series(series);

        return option;
    }
}
