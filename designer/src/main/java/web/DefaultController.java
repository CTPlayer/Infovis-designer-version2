package web;

import model.myCharts.MyCharts;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.myCharts.MyChartsService;

import javax.annotation.Resource;

/**
 * Created by ct on 2016/8/18.
 */
@Controller
public class DefaultController {
    @Resource
    private MyChartsService myChartsService;

    @RequestMapping("/export")
    @ResponseBody
    public Object export(MyCharts myCharts){
        return myChartsService.add(myCharts);
    }

    @RequestMapping("/share.page")
    public Object share(String exportId, ModelMap map){
        MyCharts myCharts = myChartsService.queryAsObject(exportId);
        map.addAttribute("htmlCode",myCharts.getHtmlCode());
        map.addAttribute("jsCode",myCharts.getJsCode());
        return "export/exportTemplate";
    }
}
