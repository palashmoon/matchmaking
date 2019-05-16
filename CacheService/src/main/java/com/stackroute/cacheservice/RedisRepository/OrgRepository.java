package com.stackroute.cacheservice.RedisRepository;

import com.stackroute.cacheservice.RedisDomain.RedisOrganization;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrgRepository extends CrudRepository<RedisOrganization, Long> {

}
