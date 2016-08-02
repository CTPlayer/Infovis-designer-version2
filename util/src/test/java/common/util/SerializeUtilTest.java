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

import java.io.Serializable;
import java.util.ArrayList;
import org.junit.Test;

import common.model.*;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

/**
 * @author ct
 *
 */
public class SerializeUtilTest {
    @Test
    public void serializeToString(){
        Serializable s = new TestModel();
        assertThat(SerializeUtil.serializeToString(s), equalTo("rO0ABXNyABZjb21tb24ubW9kZWwuVGVzdE1vZGVs0c0BlmRjk/ECAAJMAAhwYXNzd29yZHQAEkxqYXZhL2xhbmcvU3RyaW5nO0wACHVzZXJuYW1lcQB+AAF4cHBw"));
    }
    
    @Test
    public void deserializeFromString(){
        assertNotNull(SerializeUtil.deserializeFromString("rO0ABXNyABZjb21tb24ubW9kZWwuVGVzdE1vZGVs0c0BlmRjk/ECAAJMAAhwYXNzd29yZHQAEkxqYXZhL2xhbmcvU3RyaW5nO0wACHVzZXJuYW1lcQB+AAF4cHBw"));
    }
    
    @Test
    public void deserializeFromStringCollection(){
        ArrayList<String> Base64s = new ArrayList<String>();
        Base64s.add("rO0ABXNyABZjb21tb24ubW9kZWwuVGVzdE1vZGVs0c0BlmRjk/ECAAJMAAhwYXNzd29yZHQAEkxqYXZhL2xhbmcvU3RyaW5nO0wACHVzZXJuYW1lcQB+AAF4cHBw");
        assertNotNull(SerializeUtil.deserializeFromStringCollection(Base64s));
    }
}
