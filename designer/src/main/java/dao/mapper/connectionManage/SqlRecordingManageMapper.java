package dao.mapper.connectionManage;

import core.plugin.mybatis.annotation.MapperMaker;
import model.connectionManage.ConnectionManage;
import model.connectionManage.SqlRecordingManage;

import java.util.List;

/**
 * Created by yx on 16/8/11.
 */
@MapperMaker
public interface SqlRecordingManageMapper {
    int add(SqlRecordingManage connectionManage);

    int delete(SqlRecordingManage connectionManage);

    List<ConnectionManage> query(SqlRecordingManage connectionManage);

    ConnectionManage queryAsObject(SqlRecordingManage connectionManage);

}
