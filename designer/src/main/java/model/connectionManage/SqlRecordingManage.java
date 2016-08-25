package model.connectionManage;

import common.model.BaseModel;

/**
 * Created by yx on 16/8/24.
 */
public class SqlRecordingManage extends BaseModel{
    private String id;
    private String recordingName;
    private String sqlRecording;
    private String connectionId;
    private String createTime;
    private String createPeople;
    private String lv;
    private String queryParam;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRecordingName() {
        return recordingName;
    }

    public void setRecordingName(String recordingName) {
        this.recordingName = recordingName;
    }

    public String getSqlRecording() {
        return sqlRecording;
    }

    public void setSqlRecording(String sqlRecording) {
        this.sqlRecording = sqlRecording;
    }

    public String getConnectionId() {
        return connectionId;
    }

    public void setConnectionId(String connectionId) {
        this.connectionId = connectionId;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getCreatePeople() {
        return createPeople;
    }

    public void setCreatePeople(String createPeople) {
        this.createPeople = createPeople;
    }

    public String getLv() {
        return lv;
    }

    public void setLv(String lv) {
        this.lv = lv;
    }

    public String getQueryParam() {
        return queryParam;
    }

    public void setQueryParam(String queryParam) {
        this.queryParam = queryParam;
    }
}
