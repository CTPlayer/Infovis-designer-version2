package service.chart;

import model.chart.ChartBuilderParams;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 图表公共方法
 *
 * Created by ct on 2016/10/13.
 */
public interface ChartsUtil {

    /**
     * 获取将要筛选字段的信息
     *
     * @param chartBuilderParams
     * @return
     * @throws Exception
     */
    Collection<Object> getFilterResult(ChartBuilderParams chartBuilderParams) throws Exception;

    /**
     * 图表数据过滤方法
     * @param dataSet
     * @param chartBuilderParams
     * @param chartType
     * @return
     * @throws Exception
     */
    void dataFilter(List<Map<String, Object>> dataSet, ChartBuilderParams chartBuilderParams, String chartType) throws Exception;

    /**
     * 获取图表构成数据
     * @param chartBuilderParams
     * @return
     * @throws Exception
     */
    List<Map<String, Object>> getChartResult(ChartBuilderParams chartBuilderParams) throws Exception;
}
