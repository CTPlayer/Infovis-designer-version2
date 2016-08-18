package service.exportCodeSave.impl;

import dao.mapper.exportCodeSave.ExportCodeSaveMapper;
import model.exportCodeSave.ExportCodeSave;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import service.exportCodeSave.ExportCodeSaveService;

import javax.annotation.Resource;

/**
 * Created by ct on 2016/8/17.
 */
@Service
public class ExportCodeSaveIServiceImpl implements ExportCodeSaveService {
    private static final Logger L = LoggerFactory.getLogger(ExportCodeSaveIServiceImpl.class);

    @Resource
    private ExportCodeSaveMapper exportCodeSaveMapper;
    @Override
    public int add(ExportCodeSave exportCodeSave) {
        exportCodeSave.setCreateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        return exportCodeSaveMapper.add(exportCodeSave);
    }

    @Override
    public ExportCodeSave queryAsObject(String exportId) {
        return exportCodeSaveMapper.queryAsObject(exportId);
    }
}
