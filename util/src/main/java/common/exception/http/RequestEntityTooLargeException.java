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
package common.exception.http;

/**
 * 413 Request Entity Too Large.
 * <p>
 * Used when a client sends an entity body that is larger than the server can or
 * wants to process.
 * </p>
 * 
 * @author CSJ
 * @email raulcsj@126.com
 * @create 2014年8月20日
 * @version 1.0
 */
public class RequestEntityTooLargeException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RequestEntityTooLargeException() {
        super();
    }

    public RequestEntityTooLargeException(String message) {
        super(message);
    }

    public RequestEntityTooLargeException(String message, Throwable cause) {
        super(message, cause);
    }

    public RequestEntityTooLargeException(Throwable cause) {
        super(cause);
    }
}
