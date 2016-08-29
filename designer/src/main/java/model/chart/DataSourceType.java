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
 * <p>
 *     图表数据来源类型
 *
 * Created by CSJ on 16/8/26.
 */
public enum DataSourceType {

    FILE("文件类型(EXCEL, CVS)"),
    RDMS("关系型数据库(MySQL, ORACLE..)");

    private String desc;

    private DataSourceType(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return this.desc;
    }

}
