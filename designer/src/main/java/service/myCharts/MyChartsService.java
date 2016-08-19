package service.myCharts;

import model.myCharts.MyCharts;

/**
 * Created by ct on 2016/8/19.
 */
public interface MyChartsService {
    String add(MyCharts myCharts);

    MyCharts queryAsObject(String exportId);
}
