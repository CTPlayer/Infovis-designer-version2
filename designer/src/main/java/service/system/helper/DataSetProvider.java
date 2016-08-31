/************************************************************************
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ************************************************************************/
package service.system.helper;

import model.chart.ChartBuilderParams;
import model.connectionManage.ConnectionManage;
import model.connectionManage.SqlRecordingManage;
import model.database.JdbcProps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import service.connectionManage.ConnectionManageService;
import service.connectionManage.SqlRecordingManageService;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 数据集采集辅助类
 *
 * @author CSJ
 */
@Component
public final class DataSetProvider {
    private static final Logger L = LoggerFactory.getLogger(DataSetProvider.class);

    @Resource
    private SqlRecordingManageService sqlRecordingManageService;

    @Resource
    private ConnectionManageService connectionManageService;

    @Resource
    private DataBaseMetadataHelper dataBaseMetadataHelper;

    public List<Map<String, Object>> prepareDataSet(ChartBuilderParams chartBuilderParams) throws Exception {

        SqlRecordingManage sqlRecordingManage = new SqlRecordingManage();
        sqlRecordingManage.setId(chartBuilderParams.getDataRecordId());
        sqlRecordingManage = sqlRecordingManageService.queryAsObject(sqlRecordingManage);

        ConnectionManage connectionManage = new ConnectionManage();
        connectionManage.setId(sqlRecordingManage.getConnectionId());
        connectionManage = connectionManageService.queryAsObject(connectionManage);

        JdbcProps jdbcProps = new JdbcProps();
        jdbcProps.setSql(sqlRecordingManage.getSqlRecording());
        jdbcProps.setUrl(connectionManage.getDbUrl());
        jdbcProps.setUsername(connectionManage.getUserName());
        jdbcProps.setPassword(connectionManage.getPassword());

        L.info("执行查询语句: {}", jdbcProps.getSql());

        return dataBaseMetadataHelper.prepareDataSet(jdbcProps);

    }

}
