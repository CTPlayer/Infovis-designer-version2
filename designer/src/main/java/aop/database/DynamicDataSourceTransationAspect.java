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
package aop.database;

import java.lang.reflect.Method;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.AfterReturningAdvice;
import org.springframework.aop.MethodBeforeAdvice;

import core.plugin.spring.database.DataSourceContextHolder;
import core.plugin.spring.database.route.DynamicDataSource;

/**
 * <p>
 * 动态切换数据源处理类, 在数据库事务开启之前切换数据库 由于spring的事物是另外一个线程
 * 
 * @author CSJ
 *
 */
public class DynamicDataSourceTransationAspect implements MethodBeforeAdvice, AfterReturningAdvice {
    static final Logger L = LoggerFactory.getLogger(DynamicDataSourceTransationAspect.class);
    @Resource
    private DynamicDataSource dynamicDataSource;

    @Override
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        DataSourceContextHolder.clearDataSourceType();
    }

    @Override
    public void before(Method method, Object[] args, Object target) throws Throwable {
        boolean isDefaultDB = false, isDaemonThread = false;
        String dbName = "";
        dynamicDataSource.selectDataSource(dbName);
    }

}
