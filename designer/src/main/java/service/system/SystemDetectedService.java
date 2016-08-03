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
     * 检测系统状态
     *
     * @return
     */
    SystemStatus checkSystemStatus();

    /**
     * <p>
     * 初始化系统核心表
     */
    void initSystemCoreTables();
}
