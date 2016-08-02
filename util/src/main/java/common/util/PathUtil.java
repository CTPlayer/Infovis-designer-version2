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

import javax.servlet.http.HttpServletRequest;

/**
 * <p>
 * 获取项目路径工具
 * 
 * @author CSJ
 */
public final class PathUtil {

    // j2ee标准结构常量
    private static final String CLASSES = "classes";
    private static final String WEB_INFO = "WEB-INF";

    private PathUtil() {
    }

    /**
     * 获取 web content 上下文路径
     */
    public final static String getWebContextUrlPath(HttpServletRequest request) {
        String path = request.getContextPath();
        String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path
                + "/";
        return basePath;
    }

    /**
     * 获取WEB-INFO目录物理磁盘路径
     */
    public final static String getWebInfoRealPath() {
        String clsPath = PathUtil.class.getResource("/").getPath();
        int index = clsPath.indexOf(CLASSES);
        int subIndex = index == -1 ? clsPath.length() : index;
        return clsPath.substring(0, subIndex);
    }

    /**
     * 获取项目发布物理磁盘路径
     */
    public static final String getWebRootRealPath() {
        String webRootRealPath = getWebInfoRealPath();
        int index = webRootRealPath.indexOf(WEB_INFO);
        int subIndex = index == -1 ? webRootRealPath.length() : index;
        return webRootRealPath.substring(0, subIndex);
    }
}