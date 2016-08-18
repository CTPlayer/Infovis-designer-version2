package dao.mapper.exportCodeSave;

import core.plugin.mybatis.annotation.MapperMaker;
import model.exportCodeSave.ExportCodeSave;

/**
 * Created by ct on 2016/8/17.
 */
@MapperMaker
public interface ExportCodeSaveMapper {
    int add(ExportCodeSave exportCodeSave);

    ExportCodeSave queryAsObject(String exportId);
}
