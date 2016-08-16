package model.database;

import common.model.BaseModel;

/**
 * Created by gzy on 2016/8/11.
 */
public class JdbcProps  extends BaseModel{

    private String driverClassName;

    private String url;

    private String username;

    private String password;

    private String dbHost;

    private String dbPort;

    private String remarks;//设置可以获取remarks信息

    private String useInformationSchema;// 设置可以获取tables remarks信息

    private String remarksReporting;//Oracle取出注释设置

    private String sql;

    private int queryMaxRows = 30;

    public String getDriverClassName() {
        return driverClassName;
    }

    public void setDriverClassName(String driverClassName) {
        this.driverClassName = driverClassName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getUseInformationSchema() {
        return useInformationSchema;
    }

    public void setUseInformationSchema(String useInformationSchema) {
        this.useInformationSchema = useInformationSchema;
    }

    public String getRemarksReporting() {
        return remarksReporting;
    }

    public void setRemarksReporting(String remarksReporting) {
        this.remarksReporting = remarksReporting;
    }

    public String getSql() {
        return sql;
    }

    public void setSql(String sql) {
        this.sql = sql;
    }

    public int getQueryMaxRows() {
        return queryMaxRows;
    }

    public void setQueryMaxRows(int queryMaxRows) {
        this.queryMaxRows = queryMaxRows;
    }

    public String getDbHost() {
        return dbHost;
    }

    public void setDbHost(String dbHost) {
        this.dbHost = dbHost;
    }

    public String getDbPort() {
        return dbPort;
    }

    public void setDbPort(String dbPort) {
        this.dbPort = dbPort;
    }

}
