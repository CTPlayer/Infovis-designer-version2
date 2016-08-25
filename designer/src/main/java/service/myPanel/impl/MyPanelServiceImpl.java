/*************************************************************************
 * Copyright (C) Unpublished JiuDaoTech Software, Inc. All rights reserved.
 * JiuDaoTech Software, Inc., Confidential and Proprietary.
 * <p>
 * This software is subject to copyright protection
 * under the laws of the Public of China and other countries.
 * <p>
 * Unless otherwise explicitly stated, this software is provided
 * by JiuDaoTech "AS IS".
 *************************************************************************/
package service.myPanel.impl;

import dao.mapper.myPanel.MyPanelMapper;
import model.myPanel.MyPanel;
import org.joda.time.DateTime;
import org.springframework.stereotype.Service;
import service.myPanel.MyPanelService;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * Created by ct on 2016/8/23.
 */
@Service
public class MyPanelServiceImpl implements MyPanelService {

    @Resource
    private MyPanelMapper myPanelMapper;

    @Override
    public String add(MyPanel myPanel) {
        String exportId = UUID.randomUUID().toString();
        myPanel.setExportId(exportId);
        myPanel.setCreateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        myPanel.setUpdateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        myPanelMapper.add(myPanel);
        return exportId;
    }

    @Override
    public MyPanel queryAsObject(String exportId) {
        return myPanelMapper.queryAsObject(exportId);
    }

    @Override
    public int update(MyPanel myPanel) throws IOException {
        myPanel.setUpdateTime(DateTime.now().toString("yyyyMMddHHmmss"));
        return myPanelMapper.update(myPanel);
    }

    @Override
    public List<MyPanel> query() {
        return myPanelMapper.query();
    }

    @Override
    public int deleteOne(String exportId) {
        return myPanelMapper.deleteOne(exportId);
    }

}
