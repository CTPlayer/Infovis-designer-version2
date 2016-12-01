package service.quartz.impl;

import org.quartz.*;
import org.quartz.Trigger;
import org.quartz.impl.triggers.SimpleTriggerImpl;
import org.springframework.stereotype.Service;
import service.quartz.QuartzService;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * Created by ct on 2016/11/23.
 */
@Service
public class QuartzServiceImpl implements QuartzService {

    @Resource
    private Scheduler quartzScheduler;

    @Override
    public void addJob(Class<? extends Job> myJob, String jobName, String jobGroup , Trigger trigger, Map<String, Object> param) throws Exception {
        JobDataMap jobDataMap = new JobDataMap(param);
        JobDetail jobDetail = JobBuilder.newJob(myJob).withIdentity(jobName ,jobGroup).setJobData(jobDataMap).build();
        quartzScheduler.scheduleJob(jobDetail, trigger);
    }

    @Override
    public void startJobs() throws Exception {
        if(!quartzScheduler.isStarted()){
            quartzScheduler.start();
        }
    }

    @Override
    public void stopJobs() throws Exception {
        if (!quartzScheduler.isShutdown()) {
            quartzScheduler.shutdown();
        }
    }

    @Override
    public Trigger generateTrigger(String startTime, String period, String triggerName, String triggerGroup) throws Exception {
        Date startAt = null;
        int roundHours = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date nowTime = sdf.parse(sdf.format(new Date()));
        if(sdf.parse(startTime).getTime() > nowTime.getTime() || sdf.parse(startTime).getTime() == nowTime.getTime()){
            startAt = sdf.parse(startTime);
        }else {
            startAt = nowTime;
        }
        switch(period){
            case "day" : roundHours = 24; break;
            case "week" : roundHours = 24*7; break;
            case "month" : roundHours = 24*7*31; break;
        }
        Trigger trigger = TriggerBuilder.newTrigger().withIdentity(triggerName, triggerGroup).startAt(startAt).withSchedule(
                SimpleScheduleBuilder.simpleSchedule().withIntervalInHours(roundHours).repeatForever()
//                SimpleScheduleBuilder.simpleSchedule().withIntervalInSeconds(5).repeatForever()
        ).build();
        return trigger;
    }

    @Override
    public void pauseJob(JobKey jobKey) throws Exception {
        quartzScheduler.pauseJob(jobKey);
    }

    @Override
    public void resumeJob(JobKey jobKey) throws Exception {
        quartzScheduler.resumeJob(jobKey);
    }

    @Override
    public void retScheduleJob(TriggerKey triggerKey, String startTime, String period) throws Exception {
        Date startAt = null;
        int roundHours = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date nowTime = sdf.parse(sdf.format(new Date()));
        if(sdf.parse(startTime).getTime() > nowTime.getTime() || sdf.parse(startTime).getTime() == nowTime.getTime()){
            startAt = sdf.parse(startTime);
        }else {
            startAt = nowTime;
        }
        switch(period){
            case "day" : roundHours = 24; break;
            case "week" : roundHours = 24*7; break;
            case "month" : roundHours = 24*7*31; break;
        }

        SimpleTriggerImpl simpleTrigger = (SimpleTriggerImpl) quartzScheduler.getTrigger(triggerKey);
        if(simpleTrigger == null){
            return;
        }
        simpleTrigger.setStartTime(startAt);
        simpleTrigger.setRepeatInterval(roundHours*60*60*1000);
//        simpleTrigger.setRepeatInterval(roundHours*1000);

        quartzScheduler.rescheduleJob(triggerKey, simpleTrigger);
    }

    @Override
    public void removeJob(String name, String group) throws Exception {
        TriggerKey triggerKey = new TriggerKey(name, group);
        if(quartzScheduler.getTrigger(triggerKey) != null){
            quartzScheduler.pauseTrigger(triggerKey);
            quartzScheduler.unscheduleJob(triggerKey);
            quartzScheduler.deleteJob(JobKey.jobKey(name, group));
        }
    }
}
