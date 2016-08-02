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
 * MySQL 通用分页语句
 *
 * @author CSJ
 */
public class MysqlDialect implements Dialect {

    /**
     * MySQL SQL:
     * 
     * <pre>
     * SELECT * FROM table limit pageSize offset START
     * </pre>
     */
    @Override
    public String getSqlWithPagination(String sql, RowBounds rowBounds) {
        StringBuilder sqlBuilder = new StringBuilder();
        long pageSize = rowBounds.getLimit() - rowBounds.getOffset();
        sqlBuilder.append(sql).append(" limit " + pageSize + " offset " + rowBounds.getOffset());
        return sqlBuilder.toString();
    }

    /**
     * MySQL Count SQL:
     * 
     * <pre>
     * SELECT COUNT(0) FROM (
     *     orginSQL
     * ) as t
     * </pre>
     * 
     */
    public String getSqlWithCount(String sql) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT COUNT(0) FROM ( ").append(sql).append(" ) as t1");
        return sqlBuilder.toString();
    }
}
