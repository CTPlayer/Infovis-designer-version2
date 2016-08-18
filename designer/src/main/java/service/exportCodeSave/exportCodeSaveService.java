package service.exportCodeSave;

import model.exportCodeSave.ExportCodeSave;

/**
 * Created by ct on 2016/8/17.
 */
public interface ExportCodeSaveService {
    int add(ExportCodeSave exportCodeSave);

    ExportCodeSave queryAsObject(String exportId);
}
