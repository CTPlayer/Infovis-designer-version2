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

import com.github.abel533.echarts.Option;

/**
 * <p>
 *     图表构建接口
 *
 * Created by CSJ on 16/8/26.
 */
public interface ChartOption {

    /**
     * 数据源类型
     *
     * @return
     */
    DataSourceType dataSourceType();

    /**
     * 转换图表配置参数
     *
     * @return
     */
    Option transform();

}
