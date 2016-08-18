package web;

import model.exportCodeSave.ExportCodeSave;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.exportCodeSave.ExportCodeSaveService;

import javax.annotation.Resource;

/**
 * Created by ct on 2016/8/18.
 */
@Controller
public class DefaultController {
    @Resource
    private ExportCodeSaveService exportCodeSaveService;

    @RequestMapping("/export")
    @ResponseBody
    public Object export(ExportCodeSave exportCodeSave){
        return exportCodeSaveService.add(exportCodeSave);
    }

    @RequestMapping("/share.page")
    public Object share(String exportId, ModelMap map){
        ExportCodeSave exportCodeSave = exportCodeSaveService.queryAsObject(exportId);
        map.addAttribute("htmlCode",exportCodeSave.getHtmlCode());
        map.addAttribute("jsCode",exportCodeSave.getJsCode());
        return "export/exportTemplate";
    }
}
