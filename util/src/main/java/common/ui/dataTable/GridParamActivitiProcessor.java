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

import com.fasterxml.jackson.databind.JsonNode;

/**
 * <p>
 * dataTable默认参数Java端解析封装工具
 * 
 * @author Yx
 */
public final class GridParamActivitiProcessor {
    final static List<String> JQ_PARAM_KEYS = Arrays.asList("page", "rows", "sidx", "sord", "filters");

    private GridParamActivitiProcessor() {
    }

    public static final Map<String, Object> render(Map<?, ?> paramMap,JsonNode jsonNode) {
        int page = Integer.parseInt(paramMap.get("page").toString());// 请求页码
        int total = Integer.valueOf(jsonNode.get("total").toString());
        int pageSize = Integer.parseInt(paramMap.get("pageSize").toString());// 记录条数

        Map<String, Object> renderMap = new HashMap<String, Object>();
        renderMap.put("page", page);// 第几页
        renderMap.put("totalPage", Math.ceil(Double.valueOf(total) / pageSize));// 总页数
        renderMap.put("totalCount", jsonNode.get("total"));// 总记录数
        renderMap.put("data", jsonNode.get("data"));// 具体查询的数据
        return renderMap;
    }

    public static final Map<String, String> process(Map<?, ?> paramMap) {
        // 分页参数
        int page = Integer.parseInt(paramMap.get("page").toString());// 请求页码
        page = page > 1 ? page : 1;
        int pageSize = Integer.parseInt(paramMap.get("pageSize").toString());// 记录条数

        Map<String, String> renderMap = new HashMap<String, String>();

        // 保留其他参数
        Set<?> keys = paramMap.keySet();
        for (Object key : keys) {
            String k = (String) key;
            if (!JQ_PARAM_KEYS.contains(k)) {
                renderMap.put(k, (String) paramMap.get(k));
            }
        }

        // 分页参数
        renderMap.put("start", String.valueOf((page - 1) * pageSize));
        renderMap.put("size", String.valueOf(page * pageSize));
        return renderMap;
    }
}
