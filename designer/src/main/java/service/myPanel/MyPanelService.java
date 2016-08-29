package service.myPanel;

import model.myPanel.MyPanel;

import java.util.List;

/**
 * 设计面板信息查询，添加等相关操作类
 * Created by ct on 2016/8/23.
 */
public interface MyPanelService {

    String insert(MyPanel myPanel) throws Exception;

    MyPanel queryAsObject(String exportId) throws Exception;

    int update(MyPanel myPanel) throws Exception;

    List<MyPanel> queryAsList(MyPanel myPanel) throws Exception;

    int delete(String exportId) throws Exception;
}
