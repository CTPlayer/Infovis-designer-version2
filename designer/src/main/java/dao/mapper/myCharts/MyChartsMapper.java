package dao.mapper.myCharts;

import core.plugin.mybatis.annotation.MapperMaker;
import model.myCharts.MyCharts;

/**
 * Created by ct on 2016/8/19.
 */
@MapperMaker
public interface MyChartsMapper {
    int add(MyCharts myCharts);

    MyCharts queryAsObject(String exportId);
}
