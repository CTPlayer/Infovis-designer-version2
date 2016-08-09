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

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import common.exception.app.AppRuntimeException;
import common.model.BaseModel;
import core.plugin.mybatis.annotation.ColumnMap;
import javassist.*;
import org.apache.commons.lang3.reflect.FieldUtils;
import org.apache.ibatis.executor.statement.PreparedStatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>
 * MyBatis 工具类
 * 
 * @author CSJ
 */
public final class MybatisHelper {
    private static final String META_PARAMETERS = "metaParameters";
    private static final String MAPPED_STATEMENT = "mappedStatement";
    private static final Logger L = LoggerFactory.getLogger(MybatisHelper.class);
    /**
     * 保存所执行SQL总记录数的值
     */
    private static ThreadLocal<Long> totalRowCountHolder = new ThreadLocal<Long>();

    private MybatisHelper() {
    }

    /**
     * 获取查询对象的记录数
     * 
     * @param sql
     *            获取总记录数的SQL
     * @param statementHandler
     * @param configuration
     * @param boundSql
     * @param connection
     * @throws Throwable
     */
    static void getCount(String sql, PreparedStatementHandler statementHandler, Configuration configuration,
            BoundSql boundSql, Connection connection) throws Throwable {
        Object parameterObject = statementHandler.getParameterHandler().getParameterObject();
        if (L.isDebugEnabled()) {
            L.debug("Total count SQL [{}] ", sql);
            L.debug("Total count Parameters: {} ", parameterObject);
        }

        PreparedStatement countStmt = null;
        ResultSet rs = null;
        try {
            countStmt = connection.prepareStatement(sql);

            final BoundSql countBS = new BoundSql(configuration, sql, boundSql.getParameterMappings(), parameterObject);
            MappedStatement mappedStatement = (MappedStatement) FieldUtils.readField(statementHandler, MAPPED_STATEMENT,
                    true);
            // fix1 start:解决 for each 参数始终为 null情况
            Field metaParamsField = getFieldByFieldName(boundSql, META_PARAMETERS);
            if (metaParamsField != null) {
                MetaObject mo = (MetaObject) FieldUtils.readField(boundSql, META_PARAMETERS, true);
                FieldUtils.writeField(countBS, META_PARAMETERS, mo, true);
            }
            // fix1 end;
            DefaultParameterHandler handler = new DefaultParameterHandler(mappedStatement, parameterObject, countBS);
            handler.setParameters(countStmt);

            rs = countStmt.executeQuery();

            long count = 0;
            if (rs.next()) {
                count = rs.getLong(1);
            }
            if (L.isDebugEnabled()) {
                L.debug("Total count: {}", count);
            }
            totalRowCountHolder.set(count);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
            } finally {
                if (countStmt != null) {
                    countStmt.close();
                }
            }
        }
    }

    public static long getPagingTotalCount() {
        return totalRowCountHolder.get();
    };

    /**
     * XML方式批量插入
     * 
     * @param sqlSessionFactory
     * @param statement
     *            在Mapper文件中定义的namespce加上Mapper中定义的标识符
     * @param objList
     *            要入库的数据列表
     */
    public static void batchInsertByXML(SqlSessionFactory sqlSessionFactory, String statement, List<?> objList) {
        SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false);

        try {
            for (Object obj : objList) {
                session.insert(statement, obj);
            }
            session.flushStatements();
            session.commit();
            session.clearCache();
        } catch (Exception ex) {
            L.error(ex.getMessage(), ex);
            session.rollback();
            throw ex;
        } finally {
            session.close();
        }
    }

    /**
     * XML方式批量更新
     * 
     * @param sqlSessionFactory
     * @param statement
     *            在Mapper文件中定义的namespce加上Mapper中定义的标识符
     * @param objList
     *            要入库的数据列表
     */
    public static void batchUpdateByXML(SqlSessionFactory sqlSessionFactory, String statement, List<?> objList) {
        SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false);

        try {
            for (Object obj : objList) {
                session.update(statement, obj);
            }
            session.flushStatements();
            session.commit();
            session.clearCache();
        } catch (Exception ex) {
            L.error(ex.getMessage(), ex);
            session.rollback();
        } finally {
            session.close();
        }
    }

    /**
     * XML方式批量删除
     * 
     * @param sqlSessionFactory
     * @param statement
     *            在Mapper文件中定义的namespce加上Mapper中定义的标识符
     * @param objList
     *            要入库的数据列表
     */
    public static void batchDeleteByXML(SqlSessionFactory sqlSessionFactory, String statement, List<?> objList) {
        SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false);

        try {
            for (Object obj : objList) {
                session.delete(statement, obj);
            }
            session.flushStatements();
            session.commit();
            session.clearCache();
        } catch (Exception ex) {
            L.error(ex.getMessage(), ex);
            session.rollback();
        } finally {
            session.close();
        }
    }

    /**
     * Mapper方式批量操作
     * 
     * @param sqlSessionFactory
     * @param mapperClass
     *            要使用的Mapper的Class
     * @param pojoClass
     *            列表中POJO对象的Class
     * @param methodName
     *            要执行的Mapper类中的方法名
     * @param objList
     *            要入库的数据列表
     */
    public static <T> void batchOperByMapper(SqlSessionFactory sqlSessionFactory, Class<T> mapperClass,
            Class<?> pojoClass, String methodName, List<?> objList) {
        SqlSession session = sqlSessionFactory.openSession(ExecutorType.BATCH, false);

        T mapper = session.getMapper(mapperClass);
        try {
            Method method = mapperClass.getMethod(methodName, Class.forName(pojoClass.getName()));
            for (Object obj : objList) {
                method.invoke(mapper, obj);
            }
            session.flushStatements();
            session.commit();
            session.clearCache();
        } catch (Exception ex) {
            ex.printStackTrace();
            session.rollback();
        } finally {
            session.close();
        }
    }

    private static Field getFieldByFieldName(Object obj, String fieldName) {
        for (Class<?> superClass = obj.getClass(); superClass != Object.class; superClass = superClass
                .getSuperclass()) {
            try {
                return superClass.getDeclaredField(fieldName);
            } catch (NoSuchFieldException e) {
            }
        }
        return null;
    }

    /**
     * <p>
     * Mybatis添加类似JPA的Column注解支持, 在不设置resultMap下支持_id, _id_, aId, a_id, userName 组合需求
     *
     */
    public static void supportColumnMap() {
        ClassPool classPool = ClassPool.getDefault();
        ClassClassPath ccpath = new ClassClassPath(new BaseModel().getClass());
        classPool.insertClassPath(ccpath);
        try {
            CtClass ctClass = classPool.get("org.apache.ibatis.executor.resultset.DefaultResultSetHandler");
            CtMethod ctMethod = ctClass.getDeclaredMethod("applyAutomaticMappings");

            StringBuilder builder = new StringBuilder();
            builder.append("{")
                    .append("   final java.util.List unmappedColumnNames = $1.getUnmappedColumnNames($2, $4);")
                    .append("   boolean foundValues = false;")
                    .append("   int length = unmappedColumnNames.size();")
                    .append("   for (int i = 0; i < length; i++) {")
                    .append("       String columnName = unmappedColumnNames.get(i).toString();")
                    .append("       String propertyName = columnName;")
                    .append("       if ($4 != null && $4.length() > 0) {")
                    .append("           if (columnName.toUpperCase(java.util.Locale.ENGLISH).startsWith($4)) {")
                    .append("               propertyName = columnName.substring($4.length());")
                    .append("           } else {")
                    .append("               continue;")
                    .append("           }")
                    .append("       }")
                    .append("       boolean mapUnderscoreToCamelCase = configuration.isMapUnderscoreToCamelCase();")
                    .append("       final String property = $3.findProperty(propertyName, mapUnderscoreToCamelCase);")
                    .append("       /******************************************************************************/")
                    .append("       /** 如果找不到，则首先查找columnMap */")
                    .append("       if(property == null) {")
                    .append("           Class sourceClass = $3.getOriginalObject().getClass();")
                    .append("           property = core.plugin.mybatis.MybatisHelper.getDomainColumnMapping(sourceClass, propertyName);")
                    .append("       }")
                    .append("       /** 尝试去下划线匹配 */")
                    .append("       if(property == null && !mapUnderscoreToCamelCase) {")
                    .append("           property = $3.findProperty(propertyName, true);")
                    .append("       }")
                    .append("       /** 采用默认解析 */")
                    .append("       /******************************************************************************/")
                    .append("       if (property != null && $3.hasSetter(property)) {")
                    .append("           final Class propertyType = $3.getSetterType(property);")
                    .append("           if (typeHandlerRegistry.hasTypeHandler(propertyType)) {")
                    .append("               final org.apache.ibatis.type.TypeHandler typeHandler = $1.getTypeHandler(propertyType, columnName);")
                    .append("               final Object value = typeHandler.getResult($1.getResultSet(), columnName);")
                    .append("               if (value != null || configuration.isCallSettersOnNulls()) {")
                    .append("                   if (value != null || !propertyType.isPrimitive()) {")
                    .append("                       $3.setValue(property, value);")
                    .append("                   }")
                    .append("                   foundValues = true;")
                    .append("               }")
                    .append("           }")
                    .append("       }")
                    .append("   }")
                    .append("   return foundValues;")
                    .append("}");
            ctMethod.setBody(builder.toString());
            ctClass.toClass();
        } catch (NotFoundException | CannotCompileException e) {
            throw new AppRuntimeException("Mybatis Column Map Error", e);
        }
    }

    /**
     * <p>
     * 获取数据模型Column Map
     *
     * @param clz
     * @param columnName
     * @return
     */
    public static String getDomainColumnMapping(Class<?> clz, String columnName) {
        Field[] fields = clz.getDeclaredFields();
        for (Field field : fields) {
            if(field.isAnnotationPresent(ColumnMap.class)) {
                ColumnMap columnInfo = field.getAnnotation(ColumnMap.class);
                String column = columnInfo.column();
                if(column.equals(columnName)) {
                    return field.getName();
                }
            }
        }
        return null;
    }
}
