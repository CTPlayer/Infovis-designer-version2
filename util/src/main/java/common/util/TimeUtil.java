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
package common.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

/**
 * <p>
 * 时间格式转换工具类
 * 
 * @author CSJ
 */
public class TimeUtil {
    private static final String DEFAULT_TIME_FORMAT = "yyyyMMddHHmmss";

    private TimeUtil() {
    }

    /**
     * <p>
     * 根据格式生成当前时间
     * 
     * @param pattern
     * @return
     */
    public static final String getNow(String pattern) {
        final SimpleDateFormat dateFormat = new SimpleDateFormat();
        if (StringUtils.isEmpty(pattern)) {
            pattern = DEFAULT_TIME_FORMAT;
        }
        dateFormat.applyPattern(pattern);
        return dateFormat.format(new Date());
    }

    public static final String getNow() {
        return getNow(null);
    }

    /**
     * <p>
     * 解析时间字符串
     * 
     * @param data
     * @return
     */
    public static final String parseDate(String data, String sourceFormat, String destFormat) {
        final SimpleDateFormat dateFormat = new SimpleDateFormat();
        if (StringUtils.isEmpty(sourceFormat)) {
            sourceFormat = DEFAULT_TIME_FORMAT;
        }
        if (StringUtils.isEmpty(destFormat)) {
            destFormat = DEFAULT_TIME_FORMAT;
        }
        dateFormat.applyPattern(sourceFormat);
        try {
            Date time = dateFormat.parse(data);
            dateFormat.applyPattern(destFormat);
            return dateFormat.format(time);
        } catch (ParseException e) {
            return e.getMessage();
        }
    }

    public static final String parseDate(String data, String sourceFormat) {
        return parseDate(data, sourceFormat, null);
    }

    public static final String parseDate(String data) {
        return parseDate(data, null, null);
    }

    /**
     * 格式化Date
     */
    public static final String formatDate(Date date, String format) {
        final SimpleDateFormat dateFormat = new SimpleDateFormat();
        if (StringUtils.isEmpty(format)) {
            format = DEFAULT_TIME_FORMAT;
        }
        return dateFormat.format(date);
    }

    public static final String formatDate(Date date) {
        return formatDate(date, "");
    }

    public static String formatSeconds(String value){
        if(StringUtils.isNotBlank(value)){
            Float theTime = Float.parseFloat(value);
            int minute = 0;// 分
            int hour = 0;// 小时
            if(theTime > 60) {
                minute = (int)(theTime/60);
                theTime = theTime%60;
                if(minute > 60) {
                    hour = minute/60;
                    minute = minute%60;
                }
            }
            String result = ""+theTime+"秒";
            if(minute > 0){
                result = ""+minute+"分"+result;
            }
            if(hour > 0) {
                result = ""+hour+"小时"+result;
            }
            return result;
        }else{
            return "";
        }
    }
}
