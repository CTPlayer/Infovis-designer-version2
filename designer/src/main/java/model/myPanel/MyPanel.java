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
package model.myPanel;

import common.model.BaseModel;
import org.apache.ibatis.type.Alias;

/**
 * <p>
 *     设计面板模型
 *
 * Created by ct on 2016/8/23.
 */
@Alias("MyPanel")
public class MyPanel extends BaseModel {
    private String id;
    private String panelName;
    private String panelRemark;
    private String htmlCode;
    private String jsCode;
    private String createTime;
    private String updateTime;
    private String img;
    private String exportId;
    private String backgroundClass;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPanelName() {
        return panelName;
    }

    public void setPanelName(String panelName) {
        this.panelName = panelName;
    }

    public String getJsCode() {
        return jsCode;
    }

    public void setJsCode(String jsCode) {
        this.jsCode = jsCode;
    }

    public String getHtmlCode() {
        return htmlCode;
    }

    public void setHtmlCode(String htmlCode) {
        this.htmlCode = htmlCode;
    }

    public String getPanelRemark() {
        return panelRemark;
    }

    public void setPanelRemark(String panelRemark) {
        this.panelRemark = panelRemark;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getExportId() {
        return exportId;
    }

    public void setExportId(String exportId) {
        this.exportId = exportId;
    }

    public String getBackgroundClass() {
        return backgroundClass;
    }

    public void setBackgroundClass(String backgroundClass) {
        this.backgroundClass = backgroundClass;
    }
}
