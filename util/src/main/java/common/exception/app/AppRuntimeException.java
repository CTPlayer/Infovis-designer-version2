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
package common.exception.app;

/**
 * <p>
 * 应用程序运行期异常(HTTP STATUS:500 etc.)
 * </p>
 * 
 * @author CSJ
 * @email raulcsj@126.com
 * @create 2014年8月25日
 * @version 1.0
 */
public class AppRuntimeException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public AppRuntimeException() {
        super();
    }

    public AppRuntimeException(String message) {
        super(message);
    }

    public AppRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }

    public AppRuntimeException(Throwable cause) {
        super(cause);
    }

}
