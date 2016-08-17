package core.plugin.mybatis.dialect;

import org.apache.ibatis.session.RowBounds;

/**
 * Created by gzy on 2016/8/16.
 */
public class SqlserverDialet implements Dialect {

    /**
     * SQLSERVER SQL:
     *
     * <pre>
     * SELECT * FROM table limit MAX offset START
     * </pre>
     */
    @Override
    public String getSqlWithPagination(String sql, RowBounds rowBounds) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append(sql).append(" limit " + rowBounds.getLimit() + " offset " + rowBounds.getOffset());
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
        sqlBuilder.append("SELECT COUNT(0) FROM ( ").append(sql).append(" )");
        return sqlBuilder.toString();
    }
}
