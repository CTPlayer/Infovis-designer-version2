/*************************************************************************
 * Copyright (C) Unpublished JiuDaoTech Software, Inc. All rights reserved.
 * JiuDaoTech Software, Inc., Confidential and Proprietary.
 * <p>
 * This software is subject to copyright protection
 * under the laws of the Public of China and other countries.
 * <p>
 * Unless otherwise explicitly stated, this software is provided
 * by JiuDaoTech "AS IS".
 *************************************************************************/
package service.system.helper;

import common.model.BaseModel;
import core.plugin.mybatis.dialect.SqlDialetHelper;
import core.plugin.spring.database.route.DynamicDataSource;
import model.database.ColumnMetaData;
import model.database.JdbcProps;
import model.database.TableMetaData;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 数据库元数据获取、动态查询sql辅助类
 *
 * @author CSJ, GZY, YX
 */
@Component
public class DataBaseMetadataHelper {

    private static final Logger L = LoggerFactory.getLogger(DataBaseMetadataHelper.class);

    private static final Map<Integer, String> JDBC_TYPE_MAP = new HashMap<Integer, String>();

    private final static String SQL_SELECT_REGEX = "(?is)^\\s*SELECT.*$";

    private final static String SQL_COUNT_REGEX = "(?is)^\\s*SELECT\\s+COUNT\\s*\\(\\s*(?:\\*|\\w+)\\s*\\).*$";

    static {
        JDBC_TYPE_MAP.put(Types.ARRAY, "array");
        JDBC_TYPE_MAP.put(Types.BIGINT, "bigInt");
        JDBC_TYPE_MAP.put(Types.BINARY, "binary");
        JDBC_TYPE_MAP.put(Types.BIT, "bit");
        JDBC_TYPE_MAP.put(Types.BLOB, "blob");
        JDBC_TYPE_MAP.put(Types.BOOLEAN, "boolean");
        JDBC_TYPE_MAP.put(Types.CHAR, "char");
        JDBC_TYPE_MAP.put(Types.CLOB, "clob");
        JDBC_TYPE_MAP.put(Types.DATALINK, "dataLink");
        JDBC_TYPE_MAP.put(Types.DATE, "date");
        JDBC_TYPE_MAP.put(Types.DECIMAL, "decimal");
        JDBC_TYPE_MAP.put(Types.DISTINCT, "distinct");
        JDBC_TYPE_MAP.put(Types.DOUBLE, "double");
        JDBC_TYPE_MAP.put(Types.FLOAT, "float");
        JDBC_TYPE_MAP.put(Types.INTEGER, "integer");
        JDBC_TYPE_MAP.put(Types.JAVA_OBJECT, "java_object");
        JDBC_TYPE_MAP.put(Types.LONGNVARCHAR, "longnvarchar");
        JDBC_TYPE_MAP.put(Types.LONGVARBINARY, "longvarbinary");
        JDBC_TYPE_MAP.put(Types.LONGVARCHAR, "longvarchar");
        JDBC_TYPE_MAP.put(Types.NCHAR, "nchar");
        JDBC_TYPE_MAP.put(Types.NCLOB, "nclob");
        JDBC_TYPE_MAP.put(Types.NULL, "null");
        JDBC_TYPE_MAP.put(Types.NUMERIC, "numeric");
        JDBC_TYPE_MAP.put(Types.NVARCHAR, "nvarchar");
        JDBC_TYPE_MAP.put(Types.OTHER, "other");
        JDBC_TYPE_MAP.put(Types.REAL, "real");
        JDBC_TYPE_MAP.put(Types.REF, "ref");
        JDBC_TYPE_MAP.put(Types.ROWID, "rowid");
        JDBC_TYPE_MAP.put(Types.SMALLINT, "smallint");
        JDBC_TYPE_MAP.put(Types.SQLXML, "sqlxml");
        JDBC_TYPE_MAP.put(Types.STRUCT, "struct");
        JDBC_TYPE_MAP.put(Types.TIME, "time");
        JDBC_TYPE_MAP.put(Types.TIMESTAMP, "timestamp");
        JDBC_TYPE_MAP.put(Types.TINYINT, "tinyint");
        JDBC_TYPE_MAP.put(Types.VARBINARY, "varbinary");
        JDBC_TYPE_MAP.put(Types.VARCHAR, "varchar");
    }

    @Resource
    private DynamicDataSource dynamicDataSource;

    private static String checkTableColumnType(int type) {
        String typeName = "";
        switch (type) {
            case Types.BIGINT:
            case Types.INTEGER:
            case Types.SMALLINT:
            case Types.TINYINT:
            case Types.DECIMAL:
                typeName = "int";
                break;
            case Types.DOUBLE:
            case Types.FLOAT:
            case Types.NUMERIC:
                typeName = "double";
                break;
            case Types.CHAR:
            case Types.CLOB:
            case Types.VARCHAR:
            case Types.LONGVARCHAR:
            case Types.LONGNVARCHAR:
            case Types.DATE:
            case Types.TIME:
            case Types.TIMESTAMP:
                typeName = "String";
                break;
            default:
                typeName = "byte[]";
                break;
        }
        return typeName;
    }

    /**
     * 获取数据源所有的表
     *
     * @param jdbcProps
     * @return
     * @throws Exception
     */
    public List<TableMetaData> getSchemaTables(JdbcProps jdbcProps) throws Exception {
        Connection conn = null;
        ResultSet tRs = null;
        List<TableMetaData> tableMetaDatas = new ArrayList<>();
        dynamicDataSource.selectDataSource(jdbcProps.getUrl(), jdbcProps.getUsername(), jdbcProps.getPassword());
        conn = dynamicDataSource.getConnection();
        DatabaseMetaData metaData = conn.getMetaData();
        String userName = metaData.getUserName();
        String[] tableTypes = {"TABLE", "VIEW"};
        String dbType = SqlDialetHelper.getDbTypeByUrl(jdbcProps.getUrl());
        tRs = metaData.getTables(null, null, null, tableTypes);
        while (tRs.next()) {
            TableMetaData tableMetaData = new TableMetaData();
            tableMetaData.setTableName(tRs.getString("TABLE_NAME").toLowerCase());
            tableMetaData.setTableType(tRs.getString("TABLE_TYPE"));
            tableMetaData.setTableRemark(tRs.getString("REMARKS"));
            String tableSchem = tRs.getString("TABLE_SCHEM");
            if (!"INFORMATION_SCHEMA".equalsIgnoreCase(tableSchem) && !"sys".equalsIgnoreCase(tableSchem)) {
                if ("ORACLE".equalsIgnoreCase(dbType)) {
                    if (userName.equalsIgnoreCase(tableSchem)) {
                        tableMetaDatas.add(tableMetaData);
                    }
                } else {
                    tableMetaDatas.add(tableMetaData);
                }
            }
        }
        JdbcUtils.closeResultSet(tRs);
        JdbcUtils.closeConnection(conn);
        return tableMetaDatas;
    }

    /**
     * 根据数据源和表获取表字段
     *
     * @param jdbcProps
     * @param tableName
     * @return
     * @throws Exception
     */
    public List<ColumnMetaData> getSchemaTableColumns(JdbcProps jdbcProps, String tableName) throws Exception {
        Connection conn = null;
        ResultSet cRs = null;
        List<ColumnMetaData> columnMetaDatas = new ArrayList<>();
        try {
            dynamicDataSource.selectDataSource(jdbcProps.getUrl(), jdbcProps.getUsername(), jdbcProps.getPassword());
            conn = dynamicDataSource.getConnection();
            DatabaseMetaData metaData = conn.getMetaData();
            cRs = metaData.getColumns(null, "%", tableName, "%");
            while (cRs.next()) {
                ColumnMetaData columnMetaData = new ColumnMetaData();
                String columnType = "";
                String columnName = cRs.getString("COLUMN_NAME");
                String remark = cRs.getString("REMARKS");
                int dataType = cRs.getInt("DATA_TYPE");
                boolean isAutoIncrement = cRs.getBoolean("IS_AUTOINCREMENT");
                columnType = checkTableColumnType(dataType);
                columnMetaData.setColumnName(columnName.toLowerCase());
                columnMetaData.setColumnType(columnType);
                columnMetaData.setJdbcType(JDBC_TYPE_MAP.get(dataType));
                columnMetaData.setColumnRemark(remark);
                columnMetaData.setColumnAutoIncrement(isAutoIncrement);
                columnMetaDatas.add(columnMetaData);
            }
        } catch (SQLException e) {
            L.error("获取数据库表元数据字段异常", e);
        } finally {
            JdbcUtils.closeResultSet(cRs);
            JdbcUtils.closeConnection(conn);
        }
        return columnMetaDatas;
    }

    /**
     * 判断当前连接是否有效
     *
     * @param jdbcProps
     * @return
     */
    public boolean isEffectiveDataSouce(JdbcProps jdbcProps) {
        Boolean isSuccessConnect = true;
        try {
            Socket s = new Socket();
            s.connect(new InetSocketAddress(jdbcProps.getDbHost(), Integer.parseInt(jdbcProps.getDbPort())), 10000);
        } catch (UnknownHostException e) {
            isSuccessConnect = false;
            L.info("未知的端口");
        } catch (IOException e) {
            isSuccessConnect = false;
            L.info("Socket连接失败");
        }
        return isSuccessConnect;
    }


    /**
     * 查询结果总数
     *
     * @param conn
     * @param countSql
     * @return
     * @throws Exception
     */
    private long executeCountSql(Connection conn, String countSql) throws Exception {
        L.info("统计sql:" + countSql);
        long count = 0;
        Statement st = null;
        st = conn.createStatement();
        ResultSet cRs = null;
        if (StringUtils.isNotBlank(countSql)) {
            cRs = st.executeQuery(countSql);
            if (cRs.next()) {
                count = cRs.getLong(1);
            }
        }
        JdbcUtils.closeResultSet(cRs);
        JdbcUtils.closeStatement(st);
        return count;
    }

    /**
     * 根据数据源和sql执行sql并返回表头及数据
     *
     * @param jdbcProps
     * @return
     */
    public List<String[]> executeQuerySql(JdbcProps jdbcProps) throws Exception {
        Connection conn = null;
        Statement st = null;
        ResultSet cRs = null;
        ResultSetMetaData rsmd = null;
        List<String[]> datas = new ArrayList<>();
        dynamicDataSource.selectDataSource(jdbcProps.getUrl(), jdbcProps.getUsername(), jdbcProps.getPassword());
        conn = dynamicDataSource.getConnection();
        st = conn.createStatement();
        String sql = jdbcProps.getSql();
        //sql不为空，并且为查询语句或count语句
        if (StringUtils.isNotBlank(sql)) {
            if (sql.matches(SQL_SELECT_REGEX) || sql.matches(SQL_COUNT_REGEX)) {
                int maxRows = jdbcProps.getQueryMaxRows();
                String dbType = SqlDialetHelper.getDbTypeByUrl(jdbcProps.getUrl());
                if (maxRows > 0 && !jdbcProps.isPaging()) {
                    st.setMaxRows(maxRows);
                } else if (jdbcProps.isPaging()) {//分页
                    RowBounds rowBounds = getRowBounds(jdbcProps);
                    long totalCount = executeCountSql(conn, SqlDialetHelper.getCountSqlByDialet(jdbcProps.getUrl(), sql));
                    jdbcProps.setTotalCount(totalCount);
                    sql = SqlDialetHelper.getQuerySqlByDialet(jdbcProps.getUrl(), sql, rowBounds);
                    L.info("查询sql:" + sql);
                }
                cRs = st.executeQuery(sql);
                rsmd = cRs.getMetaData();
                //sqlserver,oracle特殊处理，分页sql去掉rownumber列
                if (jdbcProps.isPaging() && ("SQLSERVER".equalsIgnoreCase(dbType) || "ORACLE".equalsIgnoreCase(dbType)) && rsmd.getColumnCount() > 1) {
                    String[] columnNameDatas = new String[rsmd.getColumnCount() - 1];
                    for (int i = 1; i < rsmd.getColumnCount(); i++) {
                        columnNameDatas[i - 1] = rsmd.getColumnLabel(i + 1);
                    }
                    datas.add(columnNameDatas);
                    while (cRs.next()) {
                        String[] columnCellDatas = new String[rsmd.getColumnCount() - 1];
                        for (int j = 1; j < rsmd.getColumnCount(); j++) {
                            columnCellDatas[j - 1] = cRs.getString(j + 1);
                        }
                        datas.add(columnCellDatas);
                    }
                } else {
                    String[] columnNameDatas = new String[rsmd.getColumnCount()];
                    for (int i = 1; i <= rsmd.getColumnCount(); i++) {
                        columnNameDatas[i - 1] = rsmd.getColumnLabel(i);
                    }
                    datas.add(columnNameDatas);
                    while (cRs.next()) {
                        String[] columnCellDatas = new String[rsmd.getColumnCount()];
                        for (int j = 1; j <= rsmd.getColumnCount(); j++) {
                            columnCellDatas[j - 1] = cRs.getString(j);
                        }
                        datas.add(columnCellDatas);
                    }
                }
            } else {
                throw new RuntimeException("Only select statement can be executed!");
            }
        } else {
            throw new RuntimeException("SQL is required!");
        }
        JdbcUtils.closeResultSet(cRs);
        JdbcUtils.closeStatement(st);
        JdbcUtils.closeConnection(conn);
        return datas;
    }

    /**
     * 执行查询语句,准备图表数据集
     *
     * @param jdbcProps
     * @return
     * @throws Exception
     */
    public List<Map<String, Object>> prepareDataSet(JdbcProps jdbcProps) throws Exception {
        Connection conn = null;
        PreparedStatement st = null;
        ResultSet cRs = null;
        ResultSetMetaData rsmd = null;
        List<Map<String, Object>> datas = new ArrayList<>();
        dynamicDataSource.selectDataSource(jdbcProps.getUrl(), jdbcProps.getUsername(), jdbcProps.getPassword());
        conn = dynamicDataSource.getConnection();
        String sql = jdbcProps.getSql();
        try {
            //sql不为空，并且为查询语句或count语句
            if (StringUtils.isNotBlank(sql)) {
                if (sql.matches(SQL_SELECT_REGEX) || sql.matches(SQL_COUNT_REGEX)) {
                    st = conn.prepareStatement(sql);
                    cRs = st.executeQuery();
                    rsmd = cRs.getMetaData();
                    String[] columnNameDatas = new String[rsmd.getColumnCount()];
                    for (int i = 1; i <= rsmd.getColumnCount(); i++) {
                        columnNameDatas[i - 1] = rsmd.getColumnLabel(i);
                    }
                    while (cRs.next()) {
                        Map<String, Object> rawDataMap = new HashMap<>();
                        for (int j = 1; j <= rsmd.getColumnCount(); j++) {
                            rawDataMap.put(columnNameDatas[j - 1], cRs.getObject(j));
                        }
                        datas.add(rawDataMap);
                    }
                } else {
                    throw new RuntimeException("Only select statement can be executed!");
                }
            } else {
                throw new RuntimeException("SQL is required!");
            }
        } finally {
            JdbcUtils.closeResultSet(cRs);
            JdbcUtils.closeStatement(st);
            JdbcUtils.closeConnection(conn);
        }
        return datas;
    }

    /**
     * 根据数据源和sql执行sql并返回表头以及表头数据类型
     *
     * @param jdbcProps
     * @return
     */
    public List<Map<String, String>> getQuerySqlInfo(JdbcProps jdbcProps) throws Exception {
        Connection conn;
        Statement st;
        ResultSet cRs;
        ResultSetMetaData rsmd;
        List<Map<String, String>> datas = new ArrayList<>();
        dynamicDataSource.selectDataSource(jdbcProps.getUrl(), jdbcProps.getUsername(), jdbcProps.getPassword());
        conn = dynamicDataSource.getConnection();
        st = conn.createStatement();
        String sql = jdbcProps.getSql();
        //只查询表头以及表头的类型
        if (StringUtils.isNotBlank(sql)) {
            if (sql.matches(SQL_SELECT_REGEX) || sql.matches(SQL_COUNT_REGEX)) {
                st.setMaxRows(1);
                cRs = st.executeQuery(sql);
                rsmd = cRs.getMetaData();
                Map<String, String> columnNameDatas;
                for (int i = 1; i <= rsmd.getColumnCount(); i++) {
                    columnNameDatas = new HashMap<>();
                    columnNameDatas.put("name", rsmd.getColumnLabel(i));
                    columnNameDatas.put("type", JDBC_TYPE_MAP.get(rsmd.getColumnType(i)));
                    datas.add(columnNameDatas);
                }
            } else {
                throw new RuntimeException("Only select statement can be executed!");
            }
        } else {
            throw new RuntimeException("SQL is required!");
        }
        JdbcUtils.closeResultSet(cRs);
        JdbcUtils.closeStatement(st);
        JdbcUtils.closeConnection(conn);
        return datas;
    }

    private RowBounds getRowBounds(BaseModel entity) {
        int offset = entity.getStart();
        int limit = entity.getLimit();
        return new RowBounds(offset, limit);
    }
}