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
package service.chart;

import com.github.abel533.echarts.Option;
import model.chart.ChatBuilderParams;

/**
 * 图表构建接口
 *
 * @author CSJ
 */
public interface ChartOption {

    /**
     * 转换图表配置参数
     *
     * @param chatBuilderParams
     * @return
     */
    Option transform(ChatBuilderParams chatBuilderParams) throws Exception;

}
