/************************************************************************
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ************************************************************************/
package common.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.org.apache.xerces.internal.util.XMLChar;
import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.io.StringWriter;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * <p>
 * 模板工具类
 *
 * @author CSJ
 */
public final class TemplateUtil {
    private TemplateUtil() {
    }

    /**
     * 生成随机32位UUID号
     *
     * @return UUID
     */
    public static final String genUUID() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    /**
     * 生成指定对象JSON 格式
     *
     * @return JSON String
     */
    public static final String genJsonStr4Obj(Object obj) {
        StringWriter sw = new StringWriter();
        String jsonStr = "{}";
        JsonGenerator jsonGenerator = null;
        try {
            jsonGenerator = new ObjectMapper().getFactory().createGenerator(sw);
            jsonGenerator.writeObject(obj);
            jsonStr = sw.toString();
        } catch (Exception e) {
        } finally {
            if (sw != null) {
                try {
                    sw.close();
                } catch (IOException e) {
                } finally {
                    sw = null;
                }
            }
            if (jsonGenerator != null) {
                try {
                    jsonGenerator.close();
                } catch (IOException e) {
                } finally {
                    jsonGenerator = null;
                }
            }
        }
        return jsonStr;
    }

    /**
     * 反序列化JSON 格式对象
     *
     * @param jsonString
     * @param clazz
     * @return
     */
    public static final <T> T genObjFormJson(String jsonString, Class<T> clazz) {
        if (StringUtils.isEmpty(jsonString)) {
            return null;
        }
        try {
            return new ObjectMapper().readValue(jsonString, clazz);
        } catch (IOException e) {
            return null;
        }
    }

    /**
     * 反序列化JSON 格式对象(复杂嵌套)
     *
     * @param jsonString
     * @param reference
     * @return
     */
    public static final <T> T genObjFormJson(String jsonString, TypeReference<T> reference) {
        if (StringUtils.isEmpty(jsonString)) {
            return null;
        }
        try {
            return new ObjectMapper().readValue(jsonString, reference);
        } catch (IOException e) {
            return null;
        }
    }

    /**
     * 中文转换成汉语拼音
     *
     * @param chinese
     * @return
     */
    public static final String getPinYin(String chinese) {
        if (StringUtils.isEmpty(chinese)) {
            throw new RuntimeException("请输入要转换中文，不能为空");
        }

        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        // 音标支持HanyuPinyinToneType.WITH_TONE_MARK
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        format.setVCharType(HanyuPinyinVCharType.WITH_U_UNICODE);

        char[] input = chinese.trim().toCharArray();
        StringBuffer output = new StringBuffer("");

        try {
            for (int i = 0; i < input.length; i++) {
                if (Character.toString(input[i]).matches("[\u4E00-\u9FA5]+")) {
                    String[] temp = PinyinHelper.toHanyuPinyinStringArray(input[i], format);
                    output.append(temp[0]);
                    output.append(" ");
                } else {
                    output.append(Character.toString(input[i]));
                }
            }
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            e.printStackTrace();
        }
        return output.toString();
    }

    /**
     * 中文字符转换成首字母拼音
     *
     * @param chinese
     * @return
     */
    public static final String getPinYin4FirstSpell(String chinese, String split) {
        if (StringUtils.isEmpty(chinese)) {
            throw new RuntimeException("请输入要转换中文，不能为空");
        }
        HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
        format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        // 音标支持HanyuPinyinToneType.WITH_TONE_MARK
        format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        format.setVCharType(HanyuPinyinVCharType.WITH_U_UNICODE);

        char[] input = chinese.trim().toCharArray();
        StringBuffer output = new StringBuffer("");

        try {
            for (int i = 0; i < input.length; i++) {
                if (Character.toString(input[i]).matches("[\u4E00-\u9FA5]+")) {
                    String[] temp = PinyinHelper.toHanyuPinyinStringArray(input[i], format);
                    output.append(temp[0].charAt(0));
                    if (StringUtils.isNotEmpty(split)) {
                        output.append(split);
                    }
                } else {
                    output.append(Character.toString(input[i]));
                }
            }
        } catch (BadHanyuPinyinOutputFormatCombination e) {
            e.printStackTrace();
        }
        return output.toString();
    }

    public static final String getPinYin4FirstSpell(String chinese) {
        return getPinYin4FirstSpell(chinese, "");
    }

    /**
     * 检测文本是否包含中文
     *
     * @param chinese
     * @return
     */
    public static final boolean isChinese(String chinese) {
        if (StringUtils.isEmpty(chinese)) {
            return false;
        }
        boolean res = false;
        char[] input = chinese.trim().toCharArray();
        for (int i = 0; i < input.length; i++) {
            if (Character.toString(input[i]).matches("[\u4E00-\u9FA5]+")) {
                res = true;
                break;
            }
        }
        return res;
    }

    /**
     * 检测文本是否只含有英文字符
     *
     * @param inputStr
     * @return
     */
    public static final boolean isLetter(String inputStr) {
        if (StringUtils.isEmpty(inputStr)) {
            return false;
        }
        String regx_letter = "[a-zA-Z]+";
        Pattern p = Pattern.compile(regx_letter);
        Matcher m = p.matcher(inputStr);
        return m.matches();
    }

    /**
     * 生成encache spring key 可变对象参数方法
     *
     * @param keys
     * @return
     */
    public static final String genCacheKey4Array(String... keys) {
        StringBuilder builder = new StringBuilder();
        builder.append("[");
        for (String key : keys) {
            builder.append(key);
        }
        builder.append("]");
        return builder.toString();
    }

    /**
     * Check the string against XML's definition of acceptable names for
     * elements and attributes and so on using the XMLCharacterProperties
     * utility class
     * only for xml version 1.0
     */

    public static final boolean isXMLName(String s) {

        if (s == null) {
            return false;
        }
        return XMLChar.isValidName(s);

    } // isXMLName(String):boolean
}
