package model.myPanel;

import common.model.BaseModel;
import org.apache.ibatis.type.Alias;

/**
 * Created by ct on 2016/9/2.
 */
@Alias("PanelChartsWrapper")
public class PanelChartsWrapper extends BaseModel{
    private String id;
    private String exportId;
    private String chartId;
    private String orderId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getExportId() {
        return exportId;
    }

    public void setExportId(String exportId) {
        this.exportId = exportId;
    }

    public String getChartId() {
        return chartId;
    }

    public void setChartId(String chartId) {
        this.chartId = chartId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}
