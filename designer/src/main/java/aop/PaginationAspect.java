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
package aop;

import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.model.BaseModel;

import core.plugin.mybatis.MybatisHelper;

/**
 * <p>
 * 分页AOP,设置记录总数
 * 
 * @author CSJ
 * @version 1.0
 */
@Aspect
public class PaginationAspect {
    final Logger log = LoggerFactory.getLogger(PaginationAspect.class);

    @Pointcut("execution(* service..*Service.*AsList(..)) || execution(* service..*Service.*WithSpecStatementId(..))")
    public void beforeAspect4Ordering() {
    }

    @Before("beforeAspect4Ordering()")
    public void beforeQuery4Ordering(JoinPoint jp) {
        Object[] params = jp.getArgs();
        for (Object param : params) {
            if (param instanceof BaseModel) {
                BaseModel model = (BaseModel) param;
                if (StringUtils.isNotEmpty(model.getPagingModel().getSidx())) {
                    model.setOrdering("");
                    break;
                }
            }
        }
    }

    @AfterReturning("beforeAspect4Ordering()")
    public void afterQueryWithPage(JoinPoint jp) {
        Object[] params = jp.getArgs();
        for (Object param : params) {
            if (param instanceof BaseModel) {
                BaseModel model = (BaseModel) param;
                if (model.isPaging()) {
                    try {
                        long totalCount = MybatisHelper.getPagingTotalCount();
                        model.setTotalCount(totalCount);
                    } catch (Exception e) {
                        log.error("设置记录总数异常,可能使用了缓存,可设置pageing=false");
                    }
                }
                break;
            }
        }
    }

}
