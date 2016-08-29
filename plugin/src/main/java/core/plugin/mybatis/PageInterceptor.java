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
package core.plugin.mybatis;

import common.model.BaseModel;
import core.plugin.mybatis.dialect.Dialect;
import core.plugin.mybatis.dialect.SqlDialetHelper;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.statement.PreparedStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.RowBounds;

import java.sql.Connection;
import java.util.Properties;

/**
 * 通用分页根据不同的数据库实现
 * 
 * @author CSJ
 * 
 */
@Intercepts({ @Signature(type = StatementHandler.class, method = "prepare", args = { Connection.class }) })
public class PageInterceptor implements Interceptor {

    private final static String SQL_SELECT_REGEX = "(?is)^\\s*SELECT.*$";
    private final static String SQL_COUNT_REGEX = "(?is)^\\s*SELECT\\s+COUNT\\s*\\(\\s*(?:\\*|\\w+)\\s*\\).*$";

    @Override
    public Object intercept(Invocation inv) throws Throwable {

        StatementHandler target = (StatementHandler) inv.getTarget();
        BoundSql boundSql = target.getBoundSql();
        String sql = boundSql.getSql();
        if (StringUtils.isBlank(sql)) {
            return inv.proceed();
        }

        // 是否为select查询语句且不是count语句
        if (sql.matches(SQL_SELECT_REGEX) && !sql.matches(SQL_COUNT_REGEX)) {
            // 拦截到的prepare方法参数是一个Connection对象
            Connection connection = (Connection) inv.getArgs()[0];
            String dbType = connection.getMetaData().getDatabaseProductName();
            Dialect dialect = SqlDialetHelper.getDialetByDbType(dbType);
            Object obj = FieldUtils.readField(target, "delegate", true);
            // 反射获取 RowBounds 对象。
            RowBounds rowBounds = (RowBounds) FieldUtils.readField(obj, "rowBounds", true);
            // 添加Mapper接口情况下,分页支持
            if(rowBounds == null || rowBounds == RowBounds.DEFAULT) {
                ParameterHandler parameterHandler = (ParameterHandler) FieldUtils.readField(obj, "parameterHandler", true);
                Object paramObj = parameterHandler.getParameterObject();
                if(paramObj != null && paramObj instanceof BaseModel) {
                    BaseModel entity = (BaseModel) paramObj;
                    if(entity.isPaging()) {
                        int offset = entity.getStart();
                        int limit = entity.getLimit();
                        rowBounds = new RowBounds(offset, limit);
                    }
                }
            }
            // 分页参数存在且不为默认值时进行分页SQL构造
            if (rowBounds != null && rowBounds != RowBounds.DEFAULT) {
                // 保存此次查询的记录总数
                PreparedStatementHandler preparedStatHandler = (PreparedStatementHandler) obj;
                Configuration configuration = (Configuration) FieldUtils.readField(preparedStatHandler,
                        "configuration", true);
                MybatisHelper.getCount(dialect.getSqlWithCount(sql), preparedStatHandler, configuration, boundSql,
                        connection);
                // 构造分页语句SQL
                FieldUtils.writeField(boundSql, "sql", dialect.getSqlWithPagination(sql, rowBounds), true);
                // 一定要还原否则将无法得到下一组数据(第一次的数据被缓存了)
                FieldUtils.writeField(rowBounds, "offset", RowBounds.NO_ROW_OFFSET, true);
                FieldUtils.writeField(rowBounds, "limit", RowBounds.NO_ROW_LIMIT, true);
            }
        }
        return inv.proceed();
    }

    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {
    }
}
