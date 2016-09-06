package service.myPanel;

import model.myPanel.MyCharts;

import java.util.List;

/**
 * Created by ct on 2016/8/30.
 */
public interface MyChartsService {
    /**
     * 添加一个图表的所有相关信息
     */
    int insert(MyCharts myCharts) throws Exception;

    /**
     * 更新一个图表的所有相关信息
     */
    int update(MyCharts myCharts) throws  Exception;

    /**
     * 删除一个图表的所有相关信息
     */
    int delete(MyCharts myCharts) throws  Exception;

    /**
     * 查询一个图表的相关信息
     */
    MyCharts selectOneChartInfo(MyCharts myCharts) throws Exception;

    /**
     * 查询所有图表的相关信息
     */
    List<MyCharts> selectChartInfo(MyCharts myCharts) throws Exception;
}
