package com.stackroute.cacheservice.RedisRepository;

import com.stackroute.cacheservice.RedisDomain.RedisExperience;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpRepository extends CrudRepository<RedisExperience, Long> {

}
