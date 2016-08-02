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
package core.plugin.spring.database;

/**
 * <p>
 * 获得和设置上下文环境 主要负责改变上下文数据源的名称
 * 
 * @author CSJ
 *
 */
public final class DataSourceContextHolder {
    private static final ThreadLocal<String> CONTEXT_HOLDER = new ThreadLocal<String>(); // 线程本地环境

    // 设置数据源类型
    public static void setDataSourceType(String dataSourceType) {
        CONTEXT_HOLDER.set(dataSourceType);
    }

    // 获取数据源类型
    public static String getDataSourceType() {
        return CONTEXT_HOLDER.get();
    }

    // 清除数据源类型
    public static void clearDataSourceType() {
        CONTEXT_HOLDER.remove();
    }
}
