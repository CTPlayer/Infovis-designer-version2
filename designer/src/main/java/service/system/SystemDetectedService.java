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
package service.system;

import model.system.SystemMetaData;
import model.system.SystemStatus;

/**
 * <p>
 * 系统检测
 *
 * @author CSJ
 */
public interface SystemDetectedService {

    /**
     * <p>
     * 检测系统初始化状态
     *
     * @return
     */
    SystemStatus checkSystemInitStatus(float appVersion);

    /**
     * <p>
     * 初始化系统核心表
     */
    void initSystemCoreTables();

    /**
     * <p>
     * 执行升级系统脚本
     */
    void upgradeSystem(float from, float to);

    /**
     * <p>
     * 查询系统元数据
     *
     * @return
     */
    SystemMetaData querySystemMetaDataAsObject();

    /**
     * <p>
     * 检测quartz初始化状态
     * @param appVersion
     * @return
     */
    SystemStatus checkQuartzInitStatus(float appVersion);

    /**
     * <p>
     * 初始化quartz核心表
     */
    void initQuartzCoreTables();
}
