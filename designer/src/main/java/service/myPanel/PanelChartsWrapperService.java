package service.myPanel;

import model.myPanel.PanelChartsWrapper;

import java.util.List;

/**
 * Created by ct on 2016/9/5.
 */
public interface PanelChartsWrapperService {
    int insert(PanelChartsWrapper panelChartsWrapper) throws Exception;

    int delete(PanelChartsWrapper panelChartsWrapper) throws Exception;

    int update(PanelChartsWrapper panelChartsWrapper) throws Exception;

    List<PanelChartsWrapper> selectList(PanelChartsWrapper panelChartsWrapper) throws Exception;
}
