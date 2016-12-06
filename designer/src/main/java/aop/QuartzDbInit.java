package aop;

import core.plugin.mybatis.MybatisHelper;
import org.springframework.beans.factory.InitializingBean;
import service.system.helper.SystemSettingHelper;

import javax.annotation.Resource;

/**
 * Created by ct on 2016/12/5.
 */
public class QuartzDbInit implements InitializingBean {

    @Resource
    private SystemSettingHelper systemSettingHelper;

    @Override
    public void afterPropertiesSet() throws Exception {
        MybatisHelper.supportColumnMap();
        systemSettingHelper.checkQuartzInitStatus();
    }
}
