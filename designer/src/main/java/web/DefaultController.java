package web;

import common.util.WebUtil;
import model.myPanel.MyPanel;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.myPanel.MyPanelService;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

/**
 * Created by ct on 2016/8/18.
 */
@Controller
public class DefaultController {

    @Resource
    private MyPanelService myPanelService;

    @RequestMapping("/addPanel")
    @ResponseBody
    public Object addPanel(MyPanel myPanel) {
        return myPanelService.add(myPanel);
    }

    @RequestMapping("/showPanel.page")
    public Object showPanel(String exportId, ModelMap map) {
        MyPanel myPanel = myPanelService.queryAsObject(exportId);
        map.addAttribute("exportId", myPanel.getExportId());
        map.addAttribute("htmlCode", myPanel.getHtmlCode());
        map.addAttribute("jsCode", myPanel.getJsCode());
        return "panel/designPanel";
    }

    @RequestMapping("/export")
    @ResponseBody
    public Object export(MyPanel myPanel) throws IOException {
        myPanelService.update(myPanel);
        String snapshotImg = WebUtil.snapshotHtmlImageBase64Format(myPanel.getExtraMsg(), myPanel.getExportId());
        MyPanel panel = new MyPanel();
        panel.setExportId(myPanel.getExportId());
        panel.setImg(snapshotImg);
        return myPanelService.update(panel);
    }

    @RequestMapping("/share.page")
    public Object share(String exportId, ModelMap map) {
        MyPanel myPanel = myPanelService.queryAsObject(exportId);
        map.addAttribute("htmlCode", myPanel.getHtmlCode());
        map.addAttribute("jsCode", myPanel.getJsCode());
        return "export/exportTemplate";
    }

    @RequestMapping("/query.page")
    public Object query(ModelMap map) {
        List<MyPanel> myPanels = myPanelService.query();
        map.addAttribute("myPanels", myPanels);
        return "panel/myPanel";
    }

    @RequestMapping("/deleteOne")
    public Object deleteOne(String exportId){
        myPanelService.deleteOne(exportId);
        return "redirect:/query.page";
    }

    /*
     *根据exportId返回对应的图表options
     */
    @RequestMapping("/getOptions")
    @ResponseBody
    public Object getOptions(String exportId){
        return myPanelService.queryAsObject(exportId);
    }
}
