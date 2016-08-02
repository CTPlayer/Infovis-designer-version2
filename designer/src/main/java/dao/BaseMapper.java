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
package dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;

/**
 * Common DAO interface for MyBatis
 * 
 * @author CSJ
 * 
 */
public interface BaseMapper<T> {
    /**
     * insert a new record into DB
     * 
     * @param entity
     */
    public int insert(T entity);

    /**
     * delete a record form DB
     * 
     * @param entity
     */
    public int delete(T entity);

    /**
     * update a record form DB
     * 
     * @param entity
     */
    public int update(T entity);

    /**
     * query a record form DB
     * 
     * @param entity
     */
    public T selectOne(T entity);

    /**
     * query count number form DB
     * 
     * @param entity
     */
    public int count(T entity);

    /**
     * query a record to Map
     * 
     * @param entity
     */
    public Map<String, Object> selectMap(T entity, String mapKey);

    /**
     * query records form DB
     * 
     * @param entity
     */
    public List<T> selectList(T entity);

    /**
     * insert a new record into DB
     * 
     * @param entity
     */
    public int insert(T entity, Object extraParam);

    /**
     * delete a record form DB
     * 
     * @param entity
     */
    public int delete(T entity, Object extraParam);

    /**
     * update a record form DB
     * 
     * @param entity
     */
    public int update(T entity, Object extraParam);

    /**
     * query a record form DB
     * 
     * @param entity
     */
    public T selectOne(T entity, Object extraParam);

    /**
     * query count number form DB
     * 
     * @param entity
     */
    public int count(T entity, Object extraParam);

    /**
     * query a record to Map
     * 
     * @param entity
     */
    public Map<String, Object> selectMap(T entity, String mapKey, Object extraParam);

    /**
     * query records form DB
     * 
     * @param entity
     */
    public List<T> selectList(T entity, Object extraParam);

    /**
     * get sql session template
     * 
     * @return
     */
    public SqlSessionTemplate getSqlSessionTemplate();

}
