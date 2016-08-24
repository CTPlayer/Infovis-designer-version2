package service.connectionManage.impl;

import dao.mapper.connectionManage.SqlRecordingManageMapper;
import model.connectionManage.ConnectionManage;
import model.connectionManage.SqlRecordingManage;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import service.connectionManage.SqlRecordingManageService;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by yx on 16/8/24.
 */
@Service
public class SqlRecordingManageServiceImpl implements SqlRecordingManageService {
    private static final Logger L = LoggerFactory.getLogger(SqlRecordingManageServiceImpl.class);

    @Resource
    SqlRecordingManageMapper sqlRecordingManageMapper;
    @Override
    public int add(SqlRecordingManage sqlRecordingManage) {
        sqlRecordingManage.setCreateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        return sqlRecordingManageMapper.add(sqlRecordingManage);
    }

    @Override
    public int delete(SqlRecordingManage sqlRecordingManage) {
        return sqlRecordingManageMapper.delete(sqlRecordingManage);    }

    @Override
    public List<ConnectionManage> query(SqlRecordingManage sqlRecordingManage) {
        return sqlRecordingManageMapper.query(sqlRecordingManage);    }

    @Override
    public ConnectionManage queryAsObject(SqlRecordingManage sqlRecordingManage) {
        return sqlRecordingManageMapper.queryAsObject(sqlRecordingManage);    }
}
