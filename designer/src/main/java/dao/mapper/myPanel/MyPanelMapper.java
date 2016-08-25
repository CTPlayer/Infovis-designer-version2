/************************************************************************
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ************************************************************************/
package dao.mapper.myPanel;

import core.plugin.mybatis.annotation.MapperMaker;
import model.myPanel.MyPanel;

import java.util.List;

/**
 * Created by ct on 2016/8/23.
 */
@MapperMaker
public interface MyPanelMapper {
    int add(MyPanel myPanel);

    MyPanel queryAsObject(String exportId);

    int update(MyPanel mypanel);

    List<MyPanel> query();

    int deleteOne(String exportId);
}
