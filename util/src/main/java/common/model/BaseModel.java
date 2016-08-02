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
package common.model;

import java.io.Serializable;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 基础数据库可序列化(缓存)模型
 * 
 * @author CSJ
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class BaseModel implements Serializable {

    /* 分页模型 支持dojo:gridx,jQuery:jqGrid */
    public class PagingModel {
        // dojo gridx: sort(-name):desc | sort(+name):asc
        private static final String SORT_REGX = ".*(sort\\(([-+].+,?)*\\)).*";
        private int limit = 0;// 结尾记录数
        // 按列排序
        private String ordering;
        // 分页参数
        private int page = 0; // 当前页数
        private int pageSize = 0;// 每页记录数
        // jqGrid查询模型
        private Map<String, Object> queryParamsMap;
        // HTTP-based (RFC 2616) client with RESTful Data 'eg:items=1-10'
        // HTTP HEAD 'Rang or XRange'
        private String range;

        private String sidx;// 列序号或列名

        private String sord;// 排序方式asc|desc
        private int start = 0;// 开始记录数
        private long totalCount = 0;// 总记录数

        private int totalPage = 0;// 总页数

        public int getLimit() {
            this.setLimit(this.pageSize * page);
            return limit;
        }

        public String getOrdering() {
            return ordering;
        }

        public int getPage() {
            return page;
        }

        public int getPageSize() {
            return pageSize;
        }

        public Map<String, Object> getQueryParamsMap() {
            return queryParamsMap;
        }

        public String getRange() {
            return range;
        }

        public String getSidx() {
            return sidx;
        }

        public String getSord() {
            return sord;
        }

        public int getStart() {
            this.setStart(this.pageSize * (page - 1));
            return start;
        }

        public long getTotalCount() {
            return totalCount;
        }

        public int getTotalPage() {
            totalPage = (int) Math.ceil(Double.valueOf(totalCount) / pageSize);
            return totalPage;
        }

        public void setLimit(int limit) {
            this.limit = limit;
        }

        public void setOrdering(String ordering) {
            StringBuilder builder = new StringBuilder();
            if (ordering == null || "".equals(ordering.trim())) {
                if (this.getSidx() != null && !"".equals(this.getSidx())) {
                    builder.append(this.getSidx()).append(" ").append(this.getSord());
                }
                builder.append(",");
            } else {
                Pattern pattern = Pattern.compile(SORT_REGX);
                Matcher matcher = pattern.matcher(ordering);
                if (matcher.lookingAt()) {
                    int count = matcher.groupCount();
                    String querySortStr = matcher.group(count);
                    String[] sorts = querySortStr.split(",");
                    for (String column : sorts) {
                        String order = "asc";
                        if (column.indexOf("-") != -1) {
                            order = "desc";
                        }
                        column = column.replaceFirst("[-+]", "");
                        builder.append(column).append(" ").append(order).append(",");
                    }
                }
            }
            if (builder.indexOf(",") != -1) {
                this.ordering = builder.substring(0, builder.lastIndexOf(",")).trim();
            }
        }

        public void setPage(int page) {
            this.page = page;
        }

        public void setPageSize(int pageSize) {
            this.pageSize = pageSize;
        }

        public void setQueryParamsMap(Map<String, Object> queryParamsMap) {
            this.queryParamsMap = queryParamsMap;
        }

        public void setRange(String range) {
            String[] ranges = null;
            int start = 0;
            int limit = 0;
            try {
                ranges = range.split("=")[1].split("-");
                limit = Integer.parseInt(ranges[1]) + 1;
            } catch (Exception e) {
                range = "items=0-99";
                ranges = range.split("=")[1].split("-");
                limit = Integer.parseInt(ranges[1]) + 1;
            }
            start = Integer.parseInt(ranges[0]);

            this.setStart(start);
            this.setLimit(limit);

            this.range = range;
        }

        public void setSidx(String sidx) {
            this.sidx = sidx;
        }

        public void setSord(String sord) {
            this.sord = sord;
        }

        public void setStart(int start) {
            this.start = start;
        }

        public void setTotalCount(long totalCount) {
            this.totalCount = totalCount;
        }

    }

    private static final long serialVersionUID = 1L;

    // 额外信息
    private transient String extraMsg = "";

    // 功能描述
    private transient String functionDesc = "";

    // 是否分页
    private transient boolean paging = true;

    private transient PagingModel pagingModel = null;

    // 对应iBatis dao操作语句id
    private transient String statmentId = "";

    public BaseModel() {
        pagingModel = new PagingModel();
    }

    public String getExtraMsg() {
        return extraMsg;
    }

    @JsonIgnore
    public String getFunctionDesc() {
        return functionDesc;
    }

    @JsonIgnore
    public int getLimit() {
        return pagingModel.getLimit();
    }

    @JsonIgnore
    public String getOrdering() {
        return pagingModel.getOrdering();
    }
    
    @JsonIgnore
    public int getPage() {
        return pagingModel.getPage();
    }

    @JsonIgnore
    public int getPageSize() {
        return pagingModel.getPageSize();
    }

    @JsonIgnore
    public PagingModel getPagingModel() {
        return pagingModel;
    }

    @JsonIgnore
    public Map<String, Object> getQueryParamsMap() {
        return pagingModel.getQueryParamsMap();
    }

    @JsonIgnore
    public String getRange() {
        return pagingModel.getRange();
    }

    @JsonIgnore
    public int getStart() {
        return pagingModel.getStart();
    }

    @JsonIgnore
    public String getStatmentId() {
        return statmentId;
    }

    @JsonIgnore
    public long getTotalCount() {
        return pagingModel.getTotalCount();
    }

    @JsonIgnore
    public int getTotalPage() {
        return pagingModel.getTotalPage();
    }

    @JsonIgnore
    public boolean isPaging() {
        return paging;
    }

    public void setExtraMsg(String extraMsg) {
        this.extraMsg = extraMsg;
    }

    public void setFunctionDesc(String functionDesc) {
        this.functionDesc = functionDesc;
    }

    public void setLimit(int limit) {
        pagingModel.setLimit(limit);
    }

    public void setOrdering(String ordering) {
        pagingModel.setOrdering(ordering);
    }

    @JsonProperty
    public void setPage(int page) {
        pagingModel.setPage(page);
    }
    
    @JsonProperty
    public void setPageSize(int pageSize) {
        pagingModel.setPageSize(pageSize);
    }

    public void setPaging(boolean paging) {
        this.paging = paging;
    }

    public void setQueryParamsMap(Map<String, Object> queryParamsMap) {
        pagingModel.setQueryParamsMap(queryParamsMap);
    }

    public void setRange(String range) {
        pagingModel.setRange(range);
    }

    public void setSidx(String sidx) {
        pagingModel.setSidx(sidx);
    }

    public void setSord(String sord) {
        pagingModel.setSord(sord);
    }

    public void setStart(int start) {
        pagingModel.setStart(start);
    }

    public void setStatmentId(String statmentId) {
        this.statmentId = statmentId;
    }

    public void setTotalCount(long totalCount) {
        pagingModel.setTotalCount(totalCount);
    }

}