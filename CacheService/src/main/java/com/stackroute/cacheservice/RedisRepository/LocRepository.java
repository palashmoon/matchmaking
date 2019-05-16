package com.stackroute.cacheservice.RedisRepository;


import com.stackroute.cacheservice.RedisDomain.RedisLocation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocRepository extends CrudRepository<RedisLocation,Long> {
}
