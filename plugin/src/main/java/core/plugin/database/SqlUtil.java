package core.plugin.database;

import core.plugin.mybatis.dialect.Dialect;
import core.plugin.mybatis.dialect.H2Dialect;
import core.plugin.mybatis.dialect.MysqlDialect;
import core.plugin.mybatis.dialect.OracleDialect;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.RowBounds;

/**
 * Created by gzy on 2016/8/16.
 */
public class SqlUtil {

    public static String getQuerySqlByDialet(String url,String originalSql,RowBounds rowBounds){
        String dbType = getDbTypeByUrl(url);
        Dialect dialect = getDialetByDbType(dbType);
        String sql = dialect.getSqlWithPagination(originalSql,rowBounds);
        return sql;
    }

    public static String getCountSqlByDialet(String url,String originalSql){
        String dbType = getDbTypeByUrl(url);
        Dialect dialect = getDialetByDbType(dbType);
        String sql = dialect.getSqlWithCount(originalSql);
        return sql;
    }

    private static Dialect getDialetByDbType(String dbType){
        Dialect dialect = null;
        if(StringUtils.isNotBlank(dbType)){
            if (StringUtils.equalsIgnoreCase("ORACLE", dbType)) {
                dialect = new OracleDialect();
            } else if (StringUtils.equalsIgnoreCase("H2", dbType)) {
                dialect = new H2Dialect();
            } else if (StringUtils.equalsIgnoreCase("MYSQL", dbType)) {
                dialect = new MysqlDialect();
            } else {
                throw new RuntimeException("A404: Not Support ['" + dbType + "'] Pagination Yet!");
            }
        }
        return dialect;
    }

    private static String getDbTypeByUrl(String url){
        String dbType = "";
        if(StringUtils.isNotBlank(url)){
            if(url.startsWith("jdbc:oracle")){
                dbType = "ORACLE";
            }else if(url.startsWith("jdbc:mysql")){
                dbType = "MYSQL";
            }else if(url.startsWith("jdbc:h2")){
                dbType = "H2";
            }else if(url.startsWith("jdbc:sqlserver")){
                dbType = "SQLSERVER";
            }
        }
        return dbType;
    }
}
