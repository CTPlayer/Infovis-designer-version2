package service.connectionManage.impl;

import common.model.BaseModel;
import dao.BaseMapper;
import dao.mapper.connectionManage.ConnectionManageMapper;
import dao.mapper.system.SystemMetaDataMapper;
import model.connectionManage.ConnectionManage;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import service.connectionManage.ConnectionManageService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by yx on 16/8/11.
 */
@Service
public class ConnectionManageServiceImpl implements ConnectionManageService {
    private static final Logger L = LoggerFactory.getLogger(ConnectionManageServiceImpl.class);
    @Resource
    private ConnectionManageMapper connectionManageMapper;

    @Override
    public int add(ConnectionManage connectionManage) {
        connectionManage.setCreateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        return connectionManageMapper.add(connectionManage);
    }

    @Override
    public int delete(ConnectionManage connectionManage) {
        return connectionManageMapper.delete(connectionManage);
    }

    @Override
    public List<ConnectionManage> query(ConnectionManage connectionManage) {
        connectionManage.setPaging(false);//不分页
        return connectionManageMapper.query(connectionManage);
    }

    @Override
    public ConnectionManage queryAsObject(ConnectionManage connectionManage) {
        connectionManage.setPaging(false);//不分页
        return connectionManageMapper.queryAsObject(connectionManage);
    }

}
