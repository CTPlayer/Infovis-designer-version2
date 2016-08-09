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
import dao.mapper.system.SystemMetaDataMapper;
import model.system.SystemMetaData;
import model.system.SystemStatus;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.*;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.stereotype.Service;
import service.system.SystemDetectedService;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;
import java.sql.*;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * @see service.system.SystemDetectedService
 */
@Service("systemDetectedService")
public class SystemDetectedServiceImpl implements SystemDetectedService {

    private static final Logger L = LoggerFactory.getLogger(SystemDetectedServiceImpl.class);

    private static final String NAME_SPACE = "com.jiudaotech.www";
    private static final String[] TABLE_TYPES = {"TABLE", "VIEW"};

    @Resource
    private BaseMapper<BaseModel> baseMapper;

    @Resource
    private SystemMetaDataMapper systemMetaDataMapper;

    @Override
    public SystemStatus checkSystemInitStatus(float appVersion) {
        Connection conn = baseMapper.getSqlSessionTemplate().getConnection();
        try {
            DatabaseMetaData metaData = conn.getMetaData();
            ResultSet tableRs = metaData.getTables(null, "%", "T_SYS_CORE_METADATA", TABLE_TYPES);
            if (!tableRs.next()) {
                return SystemStatus.NOT_INIT;
            } else {
                return SystemStatus.HAS_INIT;
            }
        } catch (SQLException e) {
            throw new AppRuntimeException(e);
        }

    }

    @Override
    public void initSystemCoreTables() {
        BaseModel model = new BaseModel();
        model.setStatmentId(NAME_SPACE + ".initSystemCoreTables");
        baseMapper.update(model);
    }

    @Override
    public void upgradeSystem(float currentVersion, float appVersion) {

        L.info("更新版本, Ver: {} -> Ver: {}", currentVersion, appVersion);

        String upgradeScriptFolder = "upgrade/";
        String updateMetaSql = "UPDATE T_SYS_CORE_METADATA SET VERSION=?, UPDATE_TIME=? WHERE ID=1";

        Connection conn = baseMapper.getSqlSessionTemplate().getConnection();
        PreparedStatement statement = null;

        // 支持跨版本, 多级升级(命名规范)
        final float v1 = currentVersion, v2 = appVersion;
        URL root = SystemDetectedServiceImpl.class.getClassLoader().getResource("upgrade/");
        IOFileFilter targetFilter = new AbstractFileFilter() {
            @Override
            public boolean accept(File file) {
                boolean accept = file.getName().startsWith("v") && file.isDirectory();
                if (accept) {
                    Float upgradeVersion = Float.valueOf(file.getName().replaceAll("v", ""));
                    accept = (upgradeVersion > v1 && upgradeVersion <= v2);
                }
                return accept;
            }
        };
        List<File> targetLists = FileFilterUtils.filterList(targetFilter,
                FileUtils.listFilesAndDirs(new File(root.getFile()), DirectoryFileFilter.INSTANCE, TrueFileFilter.INSTANCE));
        Collections.sort(targetLists);
        try {
            ScriptRunner runner = new ScriptRunner(conn);
            runner.setAutoCommit(false);
            runner.setSendFullScript(true);
            for (File target : targetLists) {
                Resources.setCharset(Charset.forName("UTF-8"));
                Collection<File> scripts = FileUtils.listFiles(target, new String[]{"sql"}, true);
                for (File f : scripts) {
                    runner.runScript(Resources.getResourceAsReader(upgradeScriptFolder + target.getName() + "/" + f.getName()));
                }
            }
            // 更新元数据表版本号
            conn.setAutoCommit(false);
            statement = conn.prepareStatement(updateMetaSql);
            statement.setString(1, Float.toString(appVersion));
            statement.setString(2, DateTime.now().toString("yyyyMMddHHmmss"));
            statement.execute();
            conn.commit();
        } catch (IOException | SQLException e) {
            try {
                if (conn != null) conn.rollback();
            } catch (SQLException ex) {
            }
            L.error("更新系统至Ver:{} 出错! {}", appVersion, e.getMessage());
        } finally {
            JdbcUtils.closeStatement(statement);
            JdbcUtils.closeConnection(conn);
        }

    }

    @Override
    public SystemMetaData querySystemMetaDataAsObject() {
        return systemMetaDataMapper.querySystemMetaDataAsObject();
    }
}
