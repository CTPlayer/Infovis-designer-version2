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
package service.system.impl;

import common.exception.app.AppRuntimeException;
import common.model.BaseModel;
import dao.BaseMapper;
import model.system.SystemStatus;
import org.springframework.stereotype.Service;
import service.system.SystemDetectedService;

import javax.annotation.Resource;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @see service.system.SystemDetectedService
 */
@Service("systemDetectedService")
public class SystemDetectedServiceImpl implements SystemDetectedService {

    private static final String NAME_SPACE = "com.jiudaotech.www";
    private static final String[] TABLE_TYPES = {"TABLE", "VIEW"};

    @Resource
    private BaseMapper<BaseModel> baseMapper;

    @Override
    public SystemStatus checkSystemStatus() {

        try {
            DatabaseMetaData metaData = baseMapper.getSqlSessionTemplate().getConnection().getMetaData();
            ResultSet tableRs = metaData.getTables(null, "%", "T_SYS_CORE_METADATA", TABLE_TYPES);
            if (!tableRs.next()) {
                return SystemStatus.INIT;
            } else {
                return SystemStatus.OK;
            }
        } catch (SQLException e) {
            throw new AppRuntimeException(e);
        }

    }

    @Override
    public void initSystemCoreTables() {
        BaseModel model = new BaseModel();
        model.setStatmentId(NAME_SPACE + ".initSystemCoreTables");
        baseMapper.insert(model);
    }
}
