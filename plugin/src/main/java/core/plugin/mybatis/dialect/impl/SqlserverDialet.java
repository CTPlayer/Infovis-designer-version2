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
     SELECT * FROM (SELECT row_number() OVER (ORDER BY (select 1)) n1,* FROM (orignSql)) t1,
         (SELECT TOP limit row_number() OVER (ORDER BY (select 1)) n2 FROM (orignSql))t2
         WHERE t1.n1 = t2.n2  AND t2.n2 > offset
     * </pre>
     */
    @Override
    public String getSqlWithPagination(String sql, RowBounds rowBounds) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT * FROM( SELECT ROW_NUMBER() OVER(ORDER BY (SELECT 1)) n1,* FROM ("+sql+")t) t1,");
        sqlBuilder.append("(SELECT TOP "+rowBounds.getLimit()+" row_number() OVER (ORDER BY (select 1)) n2 FROM ("+sql+")t)t2");
        sqlBuilder.append(" WHERE t1.n1 = t2.n2  AND t2.n2 > "+rowBounds.getOffset()+" ");
        return sqlBuilder.toString();
    }

    /**
     * SQLSERVER Count SQL:
     *
     * <pre>
     * SELECT COUNT(0) FROM (
     *     orginSQL
     * )
     * </pre>
     *
     */
    @Override
    public String getSqlWithCount(String sql) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT COUNT(0) FROM ( ").append(sql).append(" ) t");
        return sqlBuilder.toString();
    }
}
