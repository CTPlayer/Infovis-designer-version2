package service.connectionManage;

import model.connectionManage.ConnectionManage;
import model.connectionManage.SqlRecordingManage;

import java.util.List;

/**
 * Created by yx on 16/8/11.
 */
public interface SqlRecordingManageService {

    int add(SqlRecordingManage sqlRecordingManage);

    int delete(SqlRecordingManage sqlRecordingManage);

    List<ConnectionManage> query(SqlRecordingManage sqlRecordingManage);

    ConnectionManage queryAsObject(SqlRecordingManage sqlRecordingManage);
}
