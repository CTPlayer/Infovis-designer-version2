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

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Test;

/**
 * @author ct
 *
 */
public class TimeUtilTest {
    @Test
    public void getNow(){
        assertNotNull(TimeUtil.getNow(""));
    }
    
    @Test
    public void parseDate(){
        assertThat(TimeUtil.parseDate("2016/3/11"), equalTo("Unparseable date: \"2016/3/11\""));
    }
    
    @Test
    public void formatDate(){
        Date date = new Date();
        assertNotNull(TimeUtil.formatDate(date));
    }
}
