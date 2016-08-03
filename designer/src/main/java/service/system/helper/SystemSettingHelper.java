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
package service.system.helper;

import core.plugin.spring.database.route.DynamicDataSource;
import model.system.SystemStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import service.system.SystemDetectedService;

import javax.annotation.Resource;
/**
 * <p>
 * 系统配置工具类
 *
 * @author CSJ
 */
@Component
public final class SystemSettingHelper {
    private static final Logger L = LoggerFactory.getLogger(SystemSettingHelper.class);

    @Resource
    private DynamicDataSource dynamicDataSource;

    @Resource
    private SystemDetectedService  systemDetectedService;

    @Value("${app.version}")
    private float appVersion;

    public void checkSystemStatus() {

        // 选择默认数据源
        dynamicDataSource.selectDataSource("");

        SystemStatus status = systemDetectedService.checkSystemStatus();
        switch (status) {
            case INIT:
                L.info("创建系统应用表");
                systemDetectedService.initSystemCoreTables();
                break;
            case UPGRADE:
                L.info("当前应用系统版本为Ver: {}", appVersion);
                break;
            case OK:
                break;
        }
    }

}
