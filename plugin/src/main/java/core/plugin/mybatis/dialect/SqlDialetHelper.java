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

import core.plugin.mybatis.dialect.impl.H2Dialect;
import core.plugin.mybatis.dialect.impl.MysqlDialect;
import core.plugin.mybatis.dialect.impl.OracleDialect;
import core.plugin.mybatis.dialect.impl.SqlserverDialet;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.RowBounds;

/**
 * Created by gzy on 2016/8/16.
 */
public class SqlDialetHelper {

    /**
     * 获取分页查询sql
     * @param url
     * @param originalSql
     * @param rowBounds
     * @return
     */
    public static String getQuerySqlByDialet(String url, String originalSql, RowBounds rowBounds) {
        String dbType = getDbTypeByUrl(url);
        Dialect dialect = getDialetByDbType(dbType);
        String sql = dialect.getSqlWithPagination(originalSql, rowBounds);
        return sql;
    }

    /**
     * 获取统计sql
     * @param url
     * @param originalSql
     * @return
     */
    public static String getCountSqlByDialet(String url, String originalSql) {
        String dbType = getDbTypeByUrl(url);
        Dialect dialect = getDialetByDbType(dbType);
        String sql = dialect.getSqlWithCount(originalSql);
        return sql;
    }

    /**
     * 根据dbType匹配Dialect
     * @param dbType
     * @return
     */
    public static Dialect getDialetByDbType(String dbType) {
        Dialect dialect = null;
        if (StringUtils.isNotBlank(dbType)) {
            if (StringUtils.equalsIgnoreCase("ORACLE", dbType)) {
                dialect = new OracleDialect();
            } else if (StringUtils.equalsIgnoreCase("H2", dbType)) {
                dialect = new H2Dialect();
            } else if (StringUtils.equalsIgnoreCase("MYSQL", dbType)) {
                dialect = new MysqlDialect();
            } else if (StringUtils.equalsIgnoreCase("SQLSERVER", dbType)) {
                dialect = new SqlserverDialet();
            } else {
                throw new RuntimeException("A404: Not Support ['" + dbType + "'] Pagination Yet!");
            }
        }
        return dialect;
    }

    /**
     * 根据jdbc url获取连接数据库类型
     * @param url
     * @return
     */
    public static String getDbTypeByUrl(String url) {
        String dbType = "";
        if (StringUtils.isNotBlank(url)) {
            if (url.startsWith("jdbc:oracle")) {
                dbType = "ORACLE";
            } else if (url.startsWith("jdbc:mysql")) {
                dbType = "MYSQL";
            } else if (url.startsWith("jdbc:h2")) {
                dbType = "H2";
            } else if (url.startsWith("jdbc:sqlserver")) {
                dbType = "SQLSERVER";
            }
        }
        return dbType;
    }
}
