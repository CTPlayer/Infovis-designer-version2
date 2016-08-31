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
package model.chart;

/**
 * 构建图形页面参数
 *
 * @author CSJ
 */
public class ChartBuilderParams {

    // 图表panel导出访问ID
    private String exportId;
    // 数据集ID
    private String dataRecordId;
    // 图形类型
    private ChartType chartType;
    // 页面构建模型
    private BuilderModel builderModel;

    public String getExportId() {
        return exportId;
    }

    public void setExportId(String exportId) {
        this.exportId = exportId;
    }

    public String getDataRecordId() {
        return dataRecordId;
    }

    public void setDataRecordId(String dataRecordId) {
        this.dataRecordId = dataRecordId;
    }

    public ChartType getChartType() {
        return chartType;
    }

    public void setChartType(ChartType chartType) {
        this.chartType = chartType;
    }

    public BuilderModel getBuilderModel() {
        return builderModel;
    }

    public void setBuilderModel(BuilderModel builderModel) {
        this.builderModel = builderModel;
    }

    public enum ChartType {
        pie, line, bar
    }
}
