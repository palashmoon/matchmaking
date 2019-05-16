package com.stackroute.cacheservice.RedisRepository;

import com.stackroute.cacheservice.RedisDomain.RedisQualification;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QualificationRepository extends CrudRepository<RedisQualification ,Long> {
}
