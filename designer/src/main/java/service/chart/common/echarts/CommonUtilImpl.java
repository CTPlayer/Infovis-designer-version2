package service.chart.common.echarts;

import common.util.TemplateUtil;
import model.chart.ChartBuilderParams;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.Transformer;
import org.springframework.stereotype.Service;
import service.chart.ChartsUtil;
import service.system.helper.DataSetProvider;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by ct on 2016/10/13.
 */
@Service
public class CommonUtilImpl implements ChartsUtil {

    @Resource
    private DataSetProvider dataSetProvider;

    @Override
    public Collection<Object> getFilterResult(final ChartBuilderParams chartBuilderParams) throws Exception {
        List<Map<String, Object>> dataSet = dataSetProvider.prepareDataSet(chartBuilderParams);
        Collection<Object> filterResult = CollectionUtils.collect(dataSet, new Transformer<Map<String, Object>, Object>() {
            @Override
            public Object transform(Map<String, Object> input) {
                Map<String, Object> transformData = new HashMap<>();
                for(int i=0;i<chartBuilderParams.getBuilderModel().getFilter().size();i++){
                    Object v = input.get(chartBuilderParams.getBuilderModel().getFilter().get(i));
                    transformData.put(chartBuilderParams.getBuilderModel().getFilter().get(i), v);
                }
                return transformData;
            }
        });
        return filterResult;
    }

    @Override
    public void dataFilter(List<Map<String, Object>> dataSet, ChartBuilderParams chartBuilderParams, String chartType) throws Exception {
        switch (chartType){
            case "bar" :
            case "line" :
                String aAxis = chartBuilderParams.getBuilderModel().getxAxis().get(0);
                String yAxis = chartBuilderParams.getBuilderModel().getyAxis().get(0);
                if(chartBuilderParams.getBuilderModel().getFilter() != null) {
                    for (int i = 0; i < chartBuilderParams.getBuilderModel().getFilter().size(); i++) {
                        String filterName = "";   //当前所过滤的字段
                        String filter = chartBuilderParams.getBuilderModel().getFilter().get(i);
                        Set<String> set = TemplateUtil.genObjFormJson(filter, Map.class).keySet();
                        for (String s : set) {
                            filterName = s;
                        }
                        if (aAxis.equals(filterName)) {
                            for (int j = 0; j < dataSet.size(); j++) {
                                if (!TemplateUtil.genObjFormJson(filter, Map.class).get(filterName).toString().contains(dataSet.get(j).get(filterName).toString())) {
                                    dataSet.remove(j);
                                    j--;
                                }
                            }
                        } else if (yAxis.equals(filterName)) {
                            String[] area = TemplateUtil.genObjFormJson(filter, Map.class).get(filterName).toString().split(",");
                            int min = Integer.parseInt(area[0]);
                            int max = Integer.parseInt(area[1]);
                            for (int k = 0; k < dataSet.size(); k++) {
                                int value = Integer.parseInt(dataSet.get(k).get(filterName).toString());
                                if (value < min || value > max) {
                                    dataSet.remove(k);
                                    k--;
                                }
                            }
                        }
                    }
                }
                break;
            case "pie" :
            case "ring":
                String color = chartBuilderParams.getBuilderModel().getMark().getColor();
                String angle = chartBuilderParams.getBuilderModel().getMark().getAngle();
                if(chartBuilderParams.getBuilderModel().getFilter() != null){
                    for(int i=0;i<chartBuilderParams.getBuilderModel().getFilter().size();i++){
                        String filterName = "";   //当前所过滤的字段
                        String filter = chartBuilderParams.getBuilderModel().getFilter().get(i);
                        Set<String> set = TemplateUtil.genObjFormJson(filter,Map.class).keySet();
                        for(String s:set){
                            filterName = s;
                        }
                        if(color.equals(filterName)){
                            for(int j=0;j<dataSet.size();j++){
                                if(!TemplateUtil.genObjFormJson(filter,Map.class).get(filterName).toString().contains(dataSet.get(j).get(filterName).toString())){
                                    dataSet.remove(j);
                                    j--;
                                }
                            }
                        }else if(angle.equals(filterName)){
                            String[] area = TemplateUtil.genObjFormJson(filter,Map.class).get(filterName).toString().split(",");
                            int min = Integer.parseInt(area[0]);
                            int max = Integer.parseInt(area[1]);
                            for(int k=0;k<dataSet.size();k++){
                                int value = Integer.parseInt(dataSet.get(k).get(filterName).toString());      //当前角度值
                                if(value < min || value > max){
                                    dataSet.remove(k);
                                    k--;
                                }
                            }
                        }
                    }
                }
                break;
        }
    }
}
