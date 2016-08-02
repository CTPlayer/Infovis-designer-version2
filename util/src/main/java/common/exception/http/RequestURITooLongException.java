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
 * 414 Request URI Too Long.
 * <p>
 * Used when a client sends a request with a request URL that is larger than the
 * server can or wants to process.
 * </p>
 * 
 * @author CSJ
 * @email raulcsj@126.com
 * @create 2014年8月20日
 * @version 1.0
 */
public class RequestURITooLongException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public RequestURITooLongException() {
        super();
    }

    public RequestURITooLongException(String message) {
        super(message);
    }

    public RequestURITooLongException(String message, Throwable cause) {
        super(message, cause);
    }

    public RequestURITooLongException(Throwable cause) {
        super(cause);
    }
}
