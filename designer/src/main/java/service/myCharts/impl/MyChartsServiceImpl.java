package service.myCharts.impl;

import dao.mapper.myCharts.MyChartsMapper;
import model.myCharts.MyCharts;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import service.myCharts.MyChartsService;

import javax.annotation.Resource;
import java.util.UUID;

/**
 * Created by ct on 2016/8/19.
 */
@Service
public class MyChartsServiceImpl implements MyChartsService{
    private static final Logger L = LoggerFactory.getLogger(MyChartsServiceImpl.class);

    @Resource
    private MyChartsMapper myChartsMapper;

    @Override
    public String add(MyCharts myCharts) {
        String exportId = UUID.randomUUID().toString();
        myCharts.setExportId(exportId);
        myCharts.setCreateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        myChartsMapper.add(myCharts);
        return exportId;
    }

    @Override
    public MyCharts queryAsObject(String exportId) {
        return myChartsMapper.queryAsObject(exportId);
    }
}
