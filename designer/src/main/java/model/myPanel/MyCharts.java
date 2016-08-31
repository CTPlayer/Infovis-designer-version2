package model.myPanel;

import common.model.BaseModel;

/**
 * Created by ct on 2016/8/30.
 */
public class MyCharts extends BaseModel{
    private String id;
    private String chartId;
    private String exportId;
    private String sqlRecordingId;
    private String buildModel;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getChartId() {
        return chartId;
    }

    public void setChartId(String chartId) {
        this.chartId = chartId;
    }

    public String getExportId() {
        return exportId;
    }

    public void setExportId(String exportId) {
        this.exportId = exportId;
    }

    public String getSqlRecordingId() {
        return sqlRecordingId;
    }

    public void setSqlRecordingId(String sqlRecordingId) {
        this.sqlRecordingId = sqlRecordingId;
    }

    public String getBuildModel() {
        return buildModel;
    }

    public void setBuildModel(String buildModel) {
        this.buildModel = buildModel;
    }
}
