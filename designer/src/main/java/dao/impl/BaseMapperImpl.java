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
package dao.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import common.model.BaseModel;

import dao.BaseMapper;

/**
 * MyBatis Common DAO implements
 * 
 * @author CSJ
 * 
 */
@Repository("baseMapper")
public class BaseMapperImpl<T extends BaseModel> implements BaseMapper<T> {

    @Resource
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int insert(T entity) {
        return sqlSessionTemplate.insert(entity.getStatmentId(), entity);
    }

    @Override
    public int delete(T entity) {
        return sqlSessionTemplate.delete(entity.getStatmentId(), entity);
    }

    @Override
    public int update(T entity) {
        return sqlSessionTemplate.update(entity.getStatmentId(), entity);
    }

    @Override
    public T selectOne(T entity) {
        return sqlSessionTemplate.selectOne(entity.getStatmentId(), entity);
    }

    @Override
    public int count(T entity) {
        return sqlSessionTemplate.selectOne(entity.getStatmentId(), entity);
    }

    @Override
    public Map<String, Object> selectMap(T entity, String mapKey) {
        return sqlSessionTemplate.selectMap(entity.getStatmentId(), entity, mapKey);
    }

    @Override
    public List<T> selectList(T entity) {
        if (entity.isPaging()) {
            RowBounds rowBounds = getRowBounds(entity);
            return sqlSessionTemplate.selectList(entity.getStatmentId(), entity, rowBounds);
        }
        return sqlSessionTemplate.selectList(entity.getStatmentId(), entity);
    }

    @Override
    public int insert(T entity, Object extraParam) {
        return sqlSessionTemplate.insert(entity.getStatmentId(), extraParam);
    }

    @Override
    public int delete(T entity, Object extraParam) {
        return sqlSessionTemplate.delete(entity.getStatmentId(), extraParam);
    }

    @Override
    public int update(T entity, Object extraParam) {
        return sqlSessionTemplate.update(entity.getStatmentId(), extraParam);
    }

    @Override
    public T selectOne(T entity, Object extraParam) {
        return sqlSessionTemplate.selectOne(entity.getStatmentId(), extraParam);
    }

    @Override
    public int count(T entity, Object extraParam) {
        return sqlSessionTemplate.selectOne(entity.getStatmentId(), extraParam);
    }

    @Override
    public Map<String, Object> selectMap(T entity, String mapKey, Object extraParam) {
        return sqlSessionTemplate.selectMap(entity.getStatmentId(), extraParam, mapKey);
    }

    @Override
    public List<T> selectList(T entity, Object extraParam) {
        if (entity.isPaging()) {
            RowBounds rowBounds = getRowBounds(entity);
            return sqlSessionTemplate.selectList(entity.getStatmentId(), extraParam, rowBounds);
        }
        return sqlSessionTemplate.selectList(entity.getStatmentId(), extraParam);
    }

    private RowBounds getRowBounds(T entity) {
        int offset = entity.getStart();
        int limit = entity.getLimit();
        return new RowBounds(offset, limit);
    }

    public SqlSessionTemplate getSqlSessionTemplate() {
        return sqlSessionTemplate;
    }

    public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
        this.sqlSessionTemplate = sqlSessionTemplate;
    }

}
