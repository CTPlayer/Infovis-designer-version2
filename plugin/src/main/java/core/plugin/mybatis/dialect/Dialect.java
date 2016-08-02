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
package core.plugin.mybatis.dialect;

import org.apache.ibatis.session.RowBounds;

/**
 * <p>
 * 分页接口, 提供统一抽象方式
 * 
 * @author CSJ
 */
public interface Dialect {
    /**
     * <p>
     * 生成分页语句
     * </p>
     * 
     * @param sql
     *            原始SQL
     * @param rowBounds
     *            分页参数
     * @return
     */
    String getSqlWithPagination(String sql, RowBounds rowBounds);

    /**
     * <p>
     * 生成查询记录数语句
     * </p>
     * 
     * @param sql
     * @return
     */
    String getSqlWithCount(String sql);
}