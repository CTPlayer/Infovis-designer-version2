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
package common.model;

import java.util.Map;

/**
 * <p>
 * 通用树模型
 * 
 * @author CSJ
 */
public abstract class TreeModel extends BaseModel {
    private static final long serialVersionUID = 1L;
    // 主键
    protected String id;
    // 名称
    protected String name;
    // 父节点ID
    protected String pId;
    // 父节点?
    protected boolean isParent;
    // 是否选中
    protected boolean checked;
    // 是否打开,默认打开
    protected boolean open = false;
    // 显示顺序
    protected int displayOrder;
    
    protected Map<String, Object> font;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public boolean isParent() {
        return isParent;
    }

    public void setParent(boolean isParent) {
        this.isParent = isParent;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    public int getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(int displayOrder) {
        this.displayOrder = displayOrder;
    }

    public Map<String, Object> getFont() {
        return font;
    }

    public void setFont(Map<String, Object> font) {
        this.font = font;
    }

}
