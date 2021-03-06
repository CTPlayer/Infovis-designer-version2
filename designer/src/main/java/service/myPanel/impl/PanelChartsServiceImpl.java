package service.myPanel.impl;

import dao.BaseMapper;
import model.myPanel.MyPanel;
import model.myPanel.PanelChartsWrapper;
import org.springframework.stereotype.Service;
import service.myPanel.PanelChartsWrapperService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by ct on 2016/9/5.
 */
@Service
public class PanelChartsServiceImpl implements PanelChartsWrapperService{

    private static final String NAMESPACE = PanelChartsWrapper.class.getName();
    @Resource
    private BaseMapper<PanelChartsWrapper> baseMapper;

    @Override
    public int insert(PanelChartsWrapper panelChartsWrapper) throws Exception {
        panelChartsWrapper.setStatmentId(NAMESPACE + ".insert");
        return baseMapper.insert(panelChartsWrapper);
    }

    @Override
    public int delete(PanelChartsWrapper panelChartsWrapper) throws Exception {
        panelChartsWrapper.setStatmentId(NAMESPACE + ".delete");
        return baseMapper.delete(panelChartsWrapper);
    }

    @Override
    public int update(PanelChartsWrapper panelChartsWrapper) throws Exception {
       delete(panelChartsWrapper);
        return insert(panelChartsWrapper);
    }

    @Override
    public List<PanelChartsWrapper> selectList(PanelChartsWrapper panelChartsWrapper) throws Exception {
        panelChartsWrapper.setStatmentId(NAMESPACE + ".selectList");
        return baseMapper.selectList(panelChartsWrapper);
    }


}
