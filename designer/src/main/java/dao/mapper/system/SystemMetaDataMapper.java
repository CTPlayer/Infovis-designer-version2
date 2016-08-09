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
package dao.mapper.system;

import core.plugin.mybatis.annotation.MapperMaker;
import model.system.SystemMetaData;

/**
 * <p>
 * 系统元数据Mappper
 *
 * @author CSJ
 */
@MapperMaker
public interface SystemMetaDataMapper {

    SystemMetaData querySystemMetaDataAsObject();

}
