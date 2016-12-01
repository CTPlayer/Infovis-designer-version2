package service.quartz;

import org.quartz.Job;
import org.quartz.JobKey;
import org.quartz.Trigger;
import org.quartz.TriggerKey;

import java.util.Map;

/**
 * Created by ct on 2016/11/23.
 */
public interface QuartzService {

    /**
     * 添加quartz任务
     * @param myJob
     * @param jobName
     * @param jobGroup
     * @param trigger
     * @param param
     * @throws Exception
     */
    void addJob(Class<? extends Job> myJob, String jobName, String jobGroup, Trigger trigger, Map<String, Object> param) throws Exception;

    /**
     * 启动定时任务
     * @throws Exception
     */
    void startJobs() throws Exception;

    /**
     * 停止定时任务
     * @throws Exception
     */
    void stopJobs() throws Exception;

    /**
     * 生成触发器
     * @return
     * @throws Exception
     */
    Trigger generateTrigger(String startTime, String period, String triggerName, String triggerGroup) throws Exception;

    /**
     * 暂停指定job
     * @param jobKey
     * @throws Exception
     */
    void pauseJob(JobKey jobKey) throws Exception;

    /**
     * 恢复指定job
     * @param jobKey
     * @throws Exception
     */
    void resumeJob(JobKey jobKey) throws Exception;

    /**
     * 更新任务执行时间
     * @param triggerKey
     * @throws Exception
     */
    void retScheduleJob(TriggerKey triggerKey, String startTime, String period) throws Exception;

    /**
     * 移除指定定时任务
     * @param name
     * @param group
     * @throws Exception
     */
    void removeJob(String name, String group) throws Exception;
}
