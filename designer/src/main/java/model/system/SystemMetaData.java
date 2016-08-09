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
package model.system;

import common.model.BaseModel;
import core.plugin.mybatis.annotation.ColumnMap;
import org.apache.ibatis.type.Alias;

/**
 * <p>
 *     系统元数据模型
 *
 * @author CSJ
 */
@Alias("SystemMetaData")
public class SystemMetaData extends BaseModel{

    private String id;

    private float version;

    @ColumnMap(column = "update_time")
    private String updateTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public float getVersion() {
        return version;
    }

    public void setVersion(float version) {
        this.version = version;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }
}
