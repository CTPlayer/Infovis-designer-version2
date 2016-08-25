package service.myPanel;

import model.myPanel.MyPanel;

import java.io.IOException;
import java.util.List;

/**
 * 设计面板信息查询，添加等相关操作类
 * Created by ct on 2016/8/23.
 */
public interface MyPanelService {
    String add(MyPanel myPanel);

    MyPanel queryAsObject(String exportId);

    int update(MyPanel myPanel) throws IOException;

    List<MyPanel> query();

    int deleteOne(String exportId);
}
