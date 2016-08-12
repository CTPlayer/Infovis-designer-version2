package model.database;

/**
 * Created by gzy on 2016/8/11.
 */
public class ColumnMetaData {

    private String jdbcType = "";
    private String columnName = "";
    private String columnType = "";
    private String columnRemark = "";
    private boolean columnAutoIncrement = false;

    public String getColumnName() {
        return columnName;
    }

    public String getColumnRemark() {
        return columnRemark;
    }

    public String getColumnType() {
        return columnType;
    }

    public String getJdbcType() {
        return jdbcType;
    }

    public boolean isColumnAutoIncrement() {
        return columnAutoIncrement;
    }

    public void setColumnAutoIncrement(boolean columnAutoIncrement) {
        this.columnAutoIncrement = columnAutoIncrement;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public void setColumnRemark(String columnRemark) {
        this.columnRemark = columnRemark;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }

    public void setJdbcType(String jdbcType) {
        this.jdbcType = jdbcType;
    }
}
