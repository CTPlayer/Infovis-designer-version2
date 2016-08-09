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
package model.system;

/**
 * <p>
 * 系统检测状态
 *
 * @author CSJ
 *
 */
public enum SystemStatus {

    NOT_INIT("未初始化"), HAS_INIT("已初始化"), UPGRADE("需要升级"), OK("正常");

    private String desc;

    private SystemStatus(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return this.desc;
    }

}
