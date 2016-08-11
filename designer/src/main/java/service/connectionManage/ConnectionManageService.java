package service.connectionManage;

import model.connectionManage.ConnectionManage;

import java.util.List;

/**
 * Created by yx on 16/8/11.
 */
public interface ConnectionManageService {

    int add(ConnectionManage connectionManage);

    int delete(ConnectionManage connectionManage);

    List<ConnectionManage> query(ConnectionManage connectionManage);
}
