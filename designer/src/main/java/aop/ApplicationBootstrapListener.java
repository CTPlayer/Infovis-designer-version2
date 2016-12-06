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
package aop;

import core.plugin.mybatis.MybatisHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ApplicationContextEvent;
import service.system.helper.SystemSettingHelper;

import javax.annotation.Resource;

/**
 * <p>
 * 应用加载器监听(做一些缓存设置等)
 * system
 * @author CSJ
 *
 */
public class ApplicationBootstrapListener implements ApplicationListener<ApplicationContextEvent> {

    private static final Logger L = LoggerFactory.getLogger(ApplicationBootstrapListener.class);

    @Resource
    private SystemSettingHelper systemSettingHelper;

    @Override
    public void onApplicationEvent(ApplicationContextEvent event) {
        /**
         * <pre>
         * 在web 项目中（spring MVC），系统会存在两个容器，
         *  一个是root application context
         *  另一个是projectName-servlet contextØ
         * 就会造成onApplicationEvent方法被执行两次
         * </pre>
         */
        if (event.getApplicationContext().getParent() == null) {
//            MybatisHelper.supportColumnMap();
            L.info("系统启动, 初始化中...\n 检测是否有新版本");
            // 需要执行的逻辑代码，当spring容器初始化完成后就会执行该方法。
            systemSettingHelper.checkSystemInitStatus();
        }

    }

}
