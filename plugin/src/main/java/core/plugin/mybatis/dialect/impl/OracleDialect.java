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
package core.plugin.mybatis.dialect.impl;

import core.plugin.mybatis.dialect.Dialect;
import org.apache.ibatis.session.RowBounds;

/**
 * <p>
 * Oracle 通用分页语句
 * 
 * @author CSJ
 */
public class OracleDialect implements Dialect {
    /**
     * ORACLE Pagination SQL:
     * 
     * <pre>
     * SELECT * FROM (
     *     SELECT row_.*, ROWNUM rownum_ FROM (
     *         orginSQL
     *     ) row_ WHERE ROWNUM <= MAX
     * )
     * WHERE rownum_ > START
     * </pre>
     */
    @Override
    public String getSqlWithPagination(String sql, RowBounds rowBounds) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder
                .append("SELECT * FROM (SELECT ROWNUM rownum_ ,row_.* FROM ( ")
                .append(sql)
                .append(" ) row_ WHERE ROWNUM <= " + rowBounds.getLimit() + ") WHERE rownum_ > "
                        + rowBounds.getOffset());
        return sqlBuilder.toString();
    }

    /**
     * ORACLE Count SQL:
     * 
     * <pre>
     * SELECT COUNT(0) FROM (
     *     orginSQL
     * )
     * </pre>
     * 
     */
    public String getSqlWithCount(String sql) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT COUNT(0) FROM ( ").append(sql).append(" )");
        return sqlBuilder.toString();
    }

}
