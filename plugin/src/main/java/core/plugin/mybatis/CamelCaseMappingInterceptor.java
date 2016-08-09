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

import common.util.TemplateUtil;
import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.plugin.*;

import java.sql.Statement;
import java.util.*;

/**
 * MyBatis Map类型大写下划线Key转小写驼峰形式
 *
 * @author CSJ
 */
@Intercepts(
        @Signature(type = ResultSetHandler.class, method = "handleResultSets", args = { Statement.class })
)
public class CamelCaseMappingInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        //先执行，后处理
        List<Object> list = (List<Object>) invocation.proceed();
        for (Object object : list) {
            if (object instanceof Map) {
                processMap((Map) object);
            } else {
                break;
            }
        }
        return list;
    }

    /**
     * 处理简单对象
     *
     * @param map
     */
    private void processMap(Map map) {
        Map camelMap = new HashMap();
        Iterator<Map.Entry> iterator = map.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry entry = iterator.next();
            String key = (String) entry.getKey();
            String camelKey = TemplateUtil.underlineToCamelCase(key.toLowerCase());
            if (!key.equals(camelKey)) {
                camelMap.put(camelKey, entry.getValue());
                iterator.remove();
            }
        }
        map.putAll(camelMap);
    }

    @Override
    public Object plugin(Object target) {
        if (target instanceof ResultSetHandler) {
            return Plugin.wrap(target, this);
        }
        return target;
    }

    @Override
    public void setProperties(Properties properties) {
    }

}