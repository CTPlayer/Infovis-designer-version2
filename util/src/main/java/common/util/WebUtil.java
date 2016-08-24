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

import com.moodysalem.phantomjs.wrapper.CommandLineArgument;
import com.moodysalem.phantomjs.wrapper.PhantomJS;
import com.moodysalem.phantomjs.wrapper.beans.PhantomJSExecutionResponse;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
/**
 * <p>
 * WEB工具
 * 
 * @author CSJ
 */
public final class WebUtil {
    private static final String PAGESTART = "start";
    private static final String PAGELIMIT = "limit";

    private WebUtil() {
    }

    /**
     * <p>
     * 获取请求参数hashMap
     * 
     * @param request
     * @return map
     */
    public static final Map<String, Object> getParamsMapFromRequest(HttpServletRequest request) {
        Map<String, Object> paramMap = new HashMap<String, Object>();
        Map<String, String[]> reqParamMap = request.getParameterMap();
        Set<Map.Entry<String, String[]>> entitySet = reqParamMap.entrySet();
        for (Map.Entry<String, String[]> entry : entitySet) {
            String value = entry.getValue()[0];
            if (!PAGESTART.equals(entry.getKey()) || !PAGELIMIT.equals(entry.getKey())) {
                paramMap.put(entry.getKey(), value);
            }
        }
        // 处理分页
        String start = request.getParameter(PAGESTART);
        String limit = request.getParameter(PAGELIMIT);
        if (StringUtils.isNotEmpty(start) && StringUtils.isNotEmpty(limit)) {
            paramMap.put(PAGESTART, start);
            paramMap.put(PAGELIMIT, Integer.valueOf(start) + Integer.valueOf(limit));
        }
        return paramMap;
    }

    /**
     * <p>
     * 获取客户端IP
     * 
     * @param request
     * @return
     */
    public static final String getIpAddrByRequest(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * <p>
     * 判断是否为Ajax请求
     * 
     * @param request
     * @return
     */
    public static final boolean isAjax(HttpServletRequest request) {
        return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
    }

    public enum BrowserType {
        IE10, IE9, IE8, IE7, IE6, Firefox, Safari, Chrome, Opera, Camino, Gecko, Other
    }

    /** 判断是否是IE */
    public static boolean isIE(HttpServletRequest request) {
        return request.getHeader("USER-AGENT").toLowerCase().indexOf("msie") > 0 ? true : false;
    }

    /**
     * 获取浏览器类型
     * 
     * @param request
     * @return
     */
    public static BrowserType getBrowserType(HttpServletRequest request) {
        BrowserType browserType = BrowserType.Other;
        if (getBrowserType(request, "msie 10.0")) {
            browserType = BrowserType.IE9;
        }
        if (getBrowserType(request, "msie 9.0")) {
            browserType = BrowserType.IE9;
        }
        if (getBrowserType(request, "msie 8.0")) {
            browserType = BrowserType.IE8;
        }
        if (getBrowserType(request, "msie 7.0")) {
            browserType = BrowserType.IE7;
        }
        if (getBrowserType(request, "msie 6.0")) {
            browserType = BrowserType.IE6;
        }
        if (getBrowserType(request, "firefox")) {
            browserType = BrowserType.Firefox;
        }
        if (getBrowserType(request, "safari")) {
            browserType = BrowserType.Safari;
        }
        if (getBrowserType(request, "chrome")) {
            browserType = BrowserType.Chrome;
        }
        if (getBrowserType(request, "opera")) {
            browserType = BrowserType.Opera;
        }
        if (getBrowserType(request, "camino")) {
            browserType = BrowserType.Camino;
        }
        return browserType;
    }

    private static boolean getBrowserType(HttpServletRequest request, String brosertype) {
        return request.getHeader("USER-AGENT").toLowerCase().indexOf(brosertype) > 0 ? true : false;
    }

    /**
     * 生成URL页面缩略图
     *
     * @param url
     * @param filename
     * @param jsWait
     * @return
     * @throws IOException
     */
    public static final String snapshotHtmlImageBase64Format(String url, String filename, long jsWait) throws IOException {
        String tmpdir = System.getProperty("java.io.tmpdir", "/tmp");
        String base64 = null;
        PhantomJSExecutionResponse resp = PhantomJS.exec(WebUtil.class.getClassLoader().getResourceAsStream("ScreenCapture.js"),
                new CommandLineArgument(url),
                new CommandLineArgument(filename),
                new CommandLineArgument(String.valueOf(jsWait)),
                new CommandLineArgument(tmpdir));
        int renderExitCode = resp.getExitCode();
        if (renderExitCode == 0) {
            File tmp = new File(tmpdir + "/" + filename + ".JPEG");
            byte[] data = FileUtils.readFileToByteArray(tmp);
            base64 = Base64.encodeBase64String(data);
            FileUtils.forceDeleteOnExit(tmp);
        }
        return base64;
    }

    public static final String snapshotHtmlImageBase64Format(String url, String filename) throws IOException {
        return snapshotHtmlImageBase64Format(url, filename, 2000l);
    }
}
