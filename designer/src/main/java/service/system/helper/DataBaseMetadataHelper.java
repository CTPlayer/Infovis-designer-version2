package service.system.helper;

import com.alibaba.druid.pool.DruidDataSource;
import common.model.BaseModel;
import core.plugin.database.SqlUtil;
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
import java.net.Socket;
import java.net.UnknownHostException;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 数据库元数据获取、动态查询sql辅助类
 * Created by gzy on 2016/8/11.
 */
@Component
public class DataBaseMetadataHelper {

    private static final Logger L = LoggerFactory.getLogger(DataBaseMetadataHelper.class);

    private static final Map<Integer, String> JDBC_TYPE_MAP = new HashMap<Integer, String>();

    private final static String SQL_SELECT_REGEX = "(?is)^\\s*SELECT.*$";

    private final static String SQL_COUNT_REGEX = "(?is)^\\s*SELECT\\s+COUNT\\s*\\(\\s*(?:\\*|\\w+)\\s*\\).*$";

    @Resource
    private DynamicDataSource dynamicDataSource;

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

    /**
     * 获取数据源所有的表
     * @param jdbcProps
     * @return
     * @throws Exception
     */
    public List<TableMetaData> getSchemaTables(JdbcProps jdbcProps) throws Exception {
        Connection conn = null;
        ResultSet tRs = null;
        List<TableMetaData> tableMetaDatas = new ArrayList<>();
        try {
            dynamicDataSource.selectDataSource(jdbcProps.getUrl(), jdbcProps.getUsername(), jdbcProps.getPassword());
            conn = dynamicDataSource.getConnection();
            DatabaseMetaData metaData = conn.getMetaData();
            String[] tableTypes = {"TABLE","VIEW"};

            tRs = metaData.getTables(null, "%", null, tableTypes);
            while (tRs.next()) {
                TableMetaData tableMetaData = new TableMetaData();
                tableMetaData.setTableName(tRs.getString("TABLE_NAME").toLowerCase());
                tableMetaData.setTableType(tRs.getString("TABLE_TYPE"));
                tableMetaData.setTableRemark(tRs.getString("REMARKS"));
                tableMetaDatas.add(tableMetaData);
            }
        } catch (SQLException e) {
            L.error("获取数据库表元数据异常", e);
        } finally {
            JdbcUtils.closeResultSet(tRs);
            JdbcUtils.closeConnection(conn);
        }
        return tableMetaDatas;
    }

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
     * 根据数据源和表获取表字段
     * @param jdbcProps
     * @param tableName
     * @return
     * @throws Exception
     */
    public List<ColumnMetaData> getSchemaTableColumns(JdbcProps jdbcProps,String tableName) throws Exception {
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
     * @param jdbcProps
     * @return
     */
    public boolean isEffectiveDataSouce(JdbcProps jdbcProps){
        Boolean isSuccessConnect = true;
        try {
            new Socket(jdbcProps.getDbHost(),Integer.parseInt(jdbcProps.getDbPort()));
            DruidDataSource druidDataSource = dynamicDataSource.createDataSource(jdbcProps.getUrl(),jdbcProps.getUsername(),jdbcProps.getPassword());
            druidDataSource.getConnection();
        } catch (SQLException e) {
            isSuccessConnect = false;
            L.info("获取数据库连接失败");
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
     * 根据数据源和sql执行sql并返回表头及数据
     * @param jdbcProps
     * @return
     */
    public List<String[]> executeQuerySql(JdbcProps jdbcProps) throws Exception{
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
        if(StringUtils.isNotBlank(sql)){
            if(sql.matches(SQL_SELECT_REGEX) || sql.matches(SQL_COUNT_REGEX)){
                int maxRows = jdbcProps.getQueryMaxRows();
                if(maxRows > 0 && !jdbcProps.isPaging()){
                    st.setMaxRows(maxRows);
                }else if(jdbcProps.isPaging()){//分页
                    RowBounds rowBounds = getRowBounds(jdbcProps);
                    sql = SqlUtil.getQuerySqlByDialet(jdbcProps.getUrl(),sql,rowBounds);
                }
                cRs = st.executeQuery(sql);
                rsmd = cRs.getMetaData();
                String[] columnNameDatas = new String[rsmd.getColumnCount()];
                for( int i=1; i<=rsmd.getColumnCount(); i++ ){
                    columnNameDatas[i-1] = rsmd.getColumnName(i);
                }
                datas.add(columnNameDatas);
                long totalCount = 0;
                while (cRs.next()){
                    String[] columnCellDatas = new String[rsmd.getColumnCount()];
                    for( int j=1; j<=rsmd.getColumnCount(); j++ ){
                        columnCellDatas[j-1] = cRs.getString(j);
                    }
                    datas.add(columnCellDatas);
                    totalCount ++;
                }
                jdbcProps.setTotalCount(totalCount);
            }else{
                throw new RuntimeException("query sql must be select statement!");
            }
        }else{
            throw new RuntimeException("query sql is empty!");
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
