/************************************************************************
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ************************************************************************/
package core.plugin.spring.database.route;

import java.sql.SQLException;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.util.StringUtils;

import com.alibaba.druid.pool.DruidDataSource;

import core.plugin.spring.database.DataSourceContextHolder;

/**
 * <p>
 * 动态切换数据源
 * 
 * @author CSJ
 *
 */
public class DynamicDataSource extends AbstractRoutingDataSource {

    final static Logger L = LoggerFactory.getLogger(DataSourceContextHolder.class);

    private static final String DEFAULT_DATA_SOURCE = "dataSource";
    private Map<Object, Object> _targetDataSources = new HashMap<Object, Object>();
    @Value("${db.url}")
    private String dbURL;
    @Value("${db.username}")
    private String dbUsername;
    @Value("${db.password}")
    private String dbPassword;

    @Override
    public Object determineCurrentLookupKey() {
        String dataSource = DataSourceContextHolder.getDataSourceType();
        if (StringUtils.isEmpty(dataSource)) {
            dataSource = DEFAULT_DATA_SOURCE;
        }
        L.debug("采用数据源:{}", dataSource);
        return dataSource;
    }

    @Override
    public void setTargetDataSources(Map<Object, Object> targetDataSources) {
        this._targetDataSources = targetDataSources;
        super.setTargetDataSources(this._targetDataSources);
        afterPropertiesSet(); // 必须设置
    }

    private void addTargetDataSource(String key, DruidDataSource dataSource) {
        this._targetDataSources.put(key, dataSource);
        this.setTargetDataSources(this._targetDataSources);
    }

    public DruidDataSource createDataSource(String url, String username, String password) {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        dataSource.setInitialSize(1);
        dataSource.setMinIdle(1);
        dataSource.setMaxActive(20);
        dataSource.setMaxWait(60000);
        dataSource.setTimeBetweenEvictionRunsMillis(60000);
        dataSource.setMinEvictableIdleTimeMillis(300000);
        dataSource.setValidationQuery("select 'x'");
        dataSource.setTestWhileIdle(true);
        dataSource.setTestOnBorrow(false);
        dataSource.setTestOnReturn(false);
        dataSource.setPoolPreparedStatements(true);
        dataSource.setMaxPoolPreparedStatementPerConnectionSize(20);
        try {
            dataSource.setFilters("stat");
        } catch (SQLException e) {
            L.error("创建连接池异常:{}", e.getMessage());
        }
        return dataSource;
    }

    /**
     * <p>
     * 数据源存在时不做处理，不存在时创建新的数据源链接，并将新数据链接添加至缓存
     */
    public void selectDataSource(String dbName) {
        if (StringUtils.isEmpty(dbName) || DEFAULT_DATA_SOURCE.equals(dbName)) {
            DataSourceContextHolder.setDataSourceType(DEFAULT_DATA_SOURCE);
            return;
        }
        Object obj = this._targetDataSources.get(dbName);
        if (obj != null) {
            DataSourceContextHolder.setDataSourceType(dbName);
            return;
        } else {
            DruidDataSource dataSource = this.getDataSource(dbName);
            if (null != dataSource) {
                this.setDataSource(dbName, dataSource);
            }
        }
    }

    private void setDataSource(String dbName, DruidDataSource dataSource) {
        this.addTargetDataSource(dbName, dataSource);
        DataSourceContextHolder.setDataSourceType(dbName);
    }

    private DruidDataSource getDataSource(String dbName) {
        /**
         * 切换至默认数据库, 动态创建数据源
         * 
         * <pre>
         * this.selectDataSource(DEFAULT_DATA_SOURCE);
         * this.determineCurrentLookupKey();
         * 
         * Connection conn = null;
         * Map<String, String> map = null;
         * try {
         *     conn = this.getConnection();
         *     PreparedStatement ps = conn.prepareStatement("SELECT * FROM t_system_register WHERE DBS_ID = ?");
         *     ps.setString(1, dbName);
         *     ResultSet rs = ps.executeQuery();
         *     if (rs.next()) {
         *         map = new HashMap<String, String>();
         *         map.put("DB_URL", rs.getString("DB_URL"));
         *         map.put("DB_UserName", rs.getString("DB_UserName"));
         *         map.put("DB_Password", rs.getString("DB_Password"));
         *     }
         *     rs.close();
         *     ps.close();
         * } catch (SQLException e) {
         *     LOG.error("切换数据库异常", e);
         * } finally {
         *     try {
         *         conn.close();
         *     } catch (SQLException e) {
         *     }
         * }
         * if (null != map) {
         *     String url = map.get("DB_URL");
         *     String userName = map.get("DB_UserName");
         *     String password = map.get("DB_Password");
         *     DruidDataSource dataSource = this.createDataSource(url, userName, password);
         *     return dataSource;
         * }
         * </pre>
         */

        String url = dbName;
        if (!dbName.startsWith("jdbc:")) { // 采用应用服务器配置DB设置
            url = MessageFormat.format(dbURL, dbName);
        }
        DruidDataSource dataSource = this.createDataSource(url, dbUsername, dbPassword);
        return dataSource;
    }

    /**
     * <p>
     *     根据URL,USERNAME,PASSWORD查询获取数据源
     * 数据源存在时不做处理，不存在时创建新的数据源链接，并将新数据链接添加至缓存
     */
    public void selectDataSource(String url, String username, String password) {
        if (StringUtils.isEmpty(url) || DEFAULT_DATA_SOURCE.equals(url)) {
            DataSourceContextHolder.setDataSourceType(DEFAULT_DATA_SOURCE);
            return;
        }
        Object obj = this._targetDataSources.get(url);
        if (obj != null) {
            DataSourceContextHolder.setDataSourceType(url);
            return;
        } else {
            DruidDataSource dataSource = createDataSource(url, username, password);
            if (null != dataSource) {
                this.setDataSource(url, dataSource);
            }
        }
    }

    public DruidDataSource getDataSource(String url,String username,String password) {
        DruidDataSource dataSource = this.createDataSource(url, username, password);
        return dataSource;
    }
}
