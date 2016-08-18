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
 * Created by gzy on 2016/8/16.
 */
public class SqlserverDialet implements Dialect {

    /**
     * SQLSERVER SQL:
     *
     * <pre>
     *
          SELECT * FROM
         (SELECT row_number() OVER (ORDER BY (select 1)) n1 FROM (orignSql)t)t1
         WHERE t t1.n1 between offset and limit
     * </pre>
     */
    @Override
    public String getSqlWithPagination(String sql, RowBounds rowBounds) {
        sql = sqlServerSqlPretreatment(sql);
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT * FROM ");
        sqlBuilder.append("(SELECT row_number() OVER (ORDER BY (select 1)) n1,* FROM ("+sql+")t)t1");
        sqlBuilder.append(" WHERE t1.n1  between "+rowBounds.getOffset()+" and "+rowBounds.getLimit());
        return sqlBuilder.toString();
    }

    /**
     * sql预处理
     * @param sql
     * @return
     */
    private String sqlServerSqlPretreatment(String sql){
        sql = sql.trim();
        while (sql.startsWith("　")) {//去掉全角空格
            sql = sql.substring(1, sql.length()).trim();
        }
        sql = "SELECT TOP 100 PERCENT "+sql.substring(6,sql.length());
        return sql;
    }

    /**
     * SQLSERVER Count SQL:
     *

     *
     */
    @Override
    public String getSqlWithCount(String sql) {
        StringBuilder sqlBuilder = new StringBuilder();
        sql = sqlServerSqlPretreatment(sql);
        sqlBuilder.append("SELECT COUNT(0) FROM ( ").append(sql).append(" )SQL");
        return sqlBuilder.toString();
    }
}
