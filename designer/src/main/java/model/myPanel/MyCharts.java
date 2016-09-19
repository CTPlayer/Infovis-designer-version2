package model.myPanel;

import common.model.BaseModel;
import org.apache.ibatis.type.Alias;

/**
 * Created by ct on 2016/8/30.
 */
@Alias("MyCharts")
public class MyCharts extends BaseModel{
    private String id;
    private String sqlRecordingId;
    private String buildModel;
    private String chartType;
    private String jsCode;
    private String chartName;
    private String isRealTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getChartType() {
        return chartType;
    }

    public void setChartType(String chartType) {
        this.chartType = chartType;
    }

    public String getJsCode() {
        return jsCode;
    }

    public void setJsCode(String jsCode) {
        this.jsCode = jsCode;
    }

    public String getChartName() {
        return chartName;
    }

    public void setChartName(String chartName) {
        this.chartName = chartName;
    }

    public String getIsRealTime() {
        return isRealTime;
    }

    public void setIsRealTime(String isRealTime) {
        this.isRealTime = isRealTime;
    }
}
