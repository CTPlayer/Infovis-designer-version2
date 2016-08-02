/************************************************************************
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 ************************************************************************/
/**
 * <p>
 * 改包下主要为Mybatis Mapper的封装,
 * 相当于Dao此情况下xml的namespace必须和Mapper类名一致才能正常调用到xml中配置的sql且每个语句的id必须和Mapper声明的方法名称一致.
 * </p>
 * 
 * <pre>
 *   所有具体实体Mapper中XML statement id对应方法名
 *   1.
 *   package org.mybatis;
 *   public interface UserDao extends SqlMapper {
 *      public User queryUserById(User user);
 *   }
 *   2.
 *   package org.mybatis;
 *   @MapperMaker
 *   public interface UserMapper {
 *      public User queryUserById(User user);
 *   }
 *
 *   <mapper namespace="org.mybatis.UserMapper">
 *     <select id="queryUserById" resultType="User">
 *         select * from tUser;
 *     </select>
 *   </mapper>
 * </pre>
 *
 * @author CSJ (raulcsj@126.com)
 * @version 1.0
 */
package dao.mapper;