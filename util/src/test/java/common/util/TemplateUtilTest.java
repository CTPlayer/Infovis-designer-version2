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

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.fasterxml.jackson.core.type.TypeReference;

import common.model.TestModel;

/**
 * @author ct
 *
 */
public class TemplateUtilTest {
    @Test
    public void genJsonStr4Obj(){
        TestModel tm = new TestModel();
        tm.setUsername("test");
        tm.setPassword("12345");
        assertThat(TemplateUtil.genJsonStr4Obj(tm), equalTo("{\"username\":\"test\",\"password\":\"12345\"}"));
        
    }
    
    @Test
    public void genObjFormJson(){
        String jsonString = null;
        Class<TestModel> clazz = null;
        assertNull(TemplateUtil.genObjFormJson(jsonString, clazz));
    }
    
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Test
    public void genObjFormJson2(){
        String jsonString = "{\"username\":\"test\",\"password\":\"12345\"}";
        Map map = new HashMap<>();
        map.put("username", "test");
        map.put("password", "12345");
        assertThat(TemplateUtil.genObjFormJson(jsonString, Map.class), equalTo(map));
    }
    
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @Test
    public void genObjFormJson3(){
        String jsonString = "{\"username\":\"test\",\"password\":\"12345\"}";
        Map map = new HashMap<>();
        map.put("username", "test");
        map.put("password", "12345");
        assertThat(TemplateUtil.genObjFormJson(jsonString, new TypeReference<Map<String,String>>() { }), equalTo(map));
    }
    
    @Test
    public void getPinYin(){
        assertThat(TemplateUtil.getPinYin("测试"), equalTo("ce shi "));
    }
    
    @Test
    public void getPinYin4FirstSpell(){
        assertThat(TemplateUtil.getPinYin4FirstSpell("测试", "test"), equalTo("cteststest"));
    }
    
    @Test
    public void isChinese(){
        assertTrue(TemplateUtil.isChinese("测试"));
        assertFalse(TemplateUtil.isChinese("ceshi"));
    }
    
    @Test
    public void isLetter(){
        assertTrue(TemplateUtil.isLetter("test"));
        assertFalse(TemplateUtil.isLetter("测试test"));
    }
    
    @Test
    public void genCacheKey4Array(){
        assertThat(TemplateUtil.genCacheKey4Array("{test1,test2,test3}"), equalTo("[{test1,test2,test3}]"));
    }
}
