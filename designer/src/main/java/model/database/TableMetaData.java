package model.database;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by gzy on 2016/8/11.
 */
public class TableMetaData {

    private String tableName = "";
    private String tableType = "";
    private String tableRemark = "";

    private List<String> primaryKeys = new ArrayList<String>();
    private List<ColumnMetaData> columns = new ArrayList<ColumnMetaData>();

    public List<ColumnMetaData> getColumns() {
        return columns;
    }

    public List<String> getPrimaryKeys() {
        return primaryKeys;
    }

    public String getTableName() {
        return tableName;
    }

    public String getTableRemark() {
        return tableRemark;
    }

    public String getTableType() {
        return tableType;
    }

    public void setColumns(List<ColumnMetaData> columns) {
        this.columns = columns;
    }

    public void setPrimaryKeys(List<String> primaryKeys) {
        this.primaryKeys = primaryKeys;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public void setTableRemark(String tableRemark) {
        this.tableRemark = tableRemark;
    }

    public void setTableType(String tableType) {
        this.tableType = tableType;
    }

    @Override
    public String toString() {
        return "TableMetaData [tableName=" + tableName + ", tableType=" + tableType + ", tableRemark=" + tableRemark
                + ", primaryKeys=" + primaryKeys + ", columns=" + columns + "]";
    }
}
