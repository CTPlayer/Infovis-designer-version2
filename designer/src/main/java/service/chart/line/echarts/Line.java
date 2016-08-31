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
package service.chart.line.echarts;

import com.github.abel533.echarts.Option;
import com.github.abel533.echarts.axis.Axis;
import com.github.abel533.echarts.axis.CategoryAxis;
import com.github.abel533.echarts.axis.ValueAxis;
import com.github.abel533.echarts.code.Trigger;
import com.github.abel533.echarts.series.Series;
import model.chart.ChatBuilderParams;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Transformer;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import service.chart.ChartOption;
import service.system.helper.DataSetProvider;

import javax.annotation.Resource;
import java.util.*;

/**
 * 标准折线图实现
 *
 * @author CSJ
 */
@Service
public class Line implements ChartOption {

    @Resource
    private DataSetProvider dataSetProvider;

    @Override
    public Option transform(final ChatBuilderParams chatBuilderParams) throws Exception {

        List<Map<String, Object>> dataSet = dataSetProvider.prepareDataSet(chatBuilderParams);

        // 拆分数据, 结构化
        Option option = new Option();
        // title
        option.title("标题", "副标题");
        // tooltip
        option.tooltip().trigger(Trigger.axis);
        // legend
        Collection<Axis> xAxisData = CollectionUtils.collect(dataSet, new Transformer<Map<String, Object>, Axis>() {
            @Override
            public Axis transform(Map<String, Object> input) {
                Object obj = input.get(chatBuilderParams.getBuilderModel().getXAxis());
                Axis axis = new CategoryAxis();
                Set<String> category = new LinkedHashSet<String>();
                if (obj != null && StringUtils.isNoneEmpty(obj.toString())) {
                    category.add(String.valueOf(obj));
                }
                axis.data().addAll(category);
                return axis;
            }
        }, new ArrayList<Axis>());
        option.xAxis().addAll(xAxisData);
        option.yAxis().add(new ValueAxis());
        // series
        Series series = new com.github.abel533.echarts.series.Line();
        Collection<Object> seriesData = CollectionUtils.collect(dataSet, new Transformer<Map<String, Object>, Object>() {
            @Override
            public Object transform(Map<String, Object> input) {
                Object v = input.get(chatBuilderParams.getBuilderModel().getYAxis());
                return v;
            }
        });
        series.data().addAll(seriesData);
        option.series(series);

        return option;
    }
}
