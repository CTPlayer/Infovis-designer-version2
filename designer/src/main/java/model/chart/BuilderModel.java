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

import java.util.List;

/**
 * 图表构建模型
 *
 * @author CSJ
 */
public class BuilderModel {

    // 列模型
    private List<String> xAxis;

    // 行模型
    private List<String> yAxis;

    // 标记模型
    private Mark mark;

    // 过滤模型
    private List<String> filter;

    public List<String> getxAxis() {
        return xAxis;
    }

    public void setxAxis(List<String> xAxis) {
        this.xAxis = xAxis;
    }

    public List<String> getyAxis() {
        return yAxis;
    }

    public void setyAxis(List<String> yAxis) {
        this.yAxis = yAxis;
    }

    public Mark getMark() {
        return mark;
    }

    public void setMark(Mark mark) {
        this.mark = mark;
    }

    public List<String> getFilter() {
        return filter;
    }

    public void setFilter(List<String> filter) {
        this.filter = filter;
    }

    /**
     * 标记模块
     */
    public static class Mark {
        private String color;
        private String angle;
        private String tag;

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        public String getAngle() {
            return angle;
        }

        public Mark setAngle(String angle) {
            this.angle = angle;
            return this;
        }

        public String getTag() {
            return tag;
        }

        public void setTag(String tag) {
            this.tag = tag;
        }
    }

}
