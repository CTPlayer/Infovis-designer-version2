/************************************************************************
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ************************************************************************/
package common.ui.dataTable;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;

import common.model.BaseModel;
import common.util.TemplateUtil;

/**
 * <p>
 * dataTable默认参数Java端解析封装工具
 * 
 * @author Yx
 */
public final class GridParamProcessor {
    final static List<String> JQ_PARAM_KEYS = Arrays.asList("page", "rows", "sidx", "sord", "filters");

    private GridParamProcessor() {
    }

    public static final Map<String, Object> render(BaseModel baseModel, List<?> baseModels) {
        Map<String, Object> renderMap = new HashMap<String, Object>();
        renderMap.put("page", baseModel.getPage());// 第几页
        renderMap.put("totalPage", baseModel.getTotalPage());// 总页数
        renderMap.put("totalCount", baseModel.getTotalCount());// 总记录数
        renderMap.put("data", baseModels);// 具体查询的数据

        return renderMap;
    }

    public static final Map<String, Object> process(Map<?, ?> paramMap) {

        // 分页参数
        int page = Integer.parseInt(paramMap.get("page") ==null?"0":paramMap.get("page").toString());// 请求页码
        page = page > 1 ? page : 1;
        int pageSize = Integer.parseInt(paramMap.get("pageSize") ==null?"0":paramMap.get("pageSize").toString());// 记录条数
        Object sidx = paramMap.get("sidx");// 按哪一列排序
        Object sord = paramMap.get("sord");// 排序方式(asc/desc)
        Object filters = paramMap.get("filters");// 过滤条件

        Map<String, Object> renderMap = new HashMap<String, Object>();

        // 保留其他参数
        Set<?> keys = paramMap.keySet();
        for (Object key : keys) {
            String k = (String) key;
            if (!JQ_PARAM_KEYS.contains(k)) {
                renderMap.put(k, paramMap.get(k));
            }
        }

        // 分页参数
        renderMap.put("page", page);
        renderMap.put("start", (page - 1) * pageSize);
        renderMap.put("limit", page * pageSize);
        // 排序参数
        if (sidx != null) {
            String sortCols = sidx.toString();
            String sortOrder = sord.toString();
            sortCols = StringUtils.trim(sortCols);
            if (sortCols.endsWith(",")) {
                sortCols = sortCols.substring(0, sortCols.length() - 1);
                sortOrder = "";
            }
            renderMap.put("sidx", sortCols);
            renderMap.put("sord", sortOrder);
        }

        /**
         * <pre>
         * 过滤查询(现只支持一级分组)
         * 前端提交格式: filters: {groupOp:"AND|OR", rules:[(field:"xxxxx",op:"eq",data:"x")*]}
         * op定义如下: ['eq','ne','lt','le','gt','ge','bw','bn','in','ni','ew','en','cn','nc']
         *          ['equal','not equal', 'less', 'less or equal','greater','greater or equal', 'begins with','does not begin with','is in','is not in','ends with','does not end with','contains','does not contain']
         *      eq 等于 '='
         *      ne 不等于 '!='
         *      lt 小于 '<'
         *      le 小于等于 '<='
         *      gt 大于 '>'
         *      ge 大于等于 '>='
         *      bw 开始于 'like *%'
         *      bn 不开始于 'not like *%'
         *      ew 结束于 'like %*'
         *      en 不结束于 'not like %*'
         *      cn 包含 'like %*%'
         *      nc 包含 'not like %*%'
         *      nu 空值于 'is null'
         *      nn 非空值 'is not null'
         *      in 属于 'in (*)'
         *      ni 不属于 'not in (*)'
         * </pre>
         */
        if (filters != null) {
            renderMap.put("queryParamsMap", TemplateUtil.genObjFormJson(filters.toString(), Map.class));
        }

        return renderMap;
    }
}
