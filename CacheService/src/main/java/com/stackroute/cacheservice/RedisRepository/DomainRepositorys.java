package com.stackroute.cacheservice.RedisRepository;

import com.stackroute.cacheservice.RedisDomain.RedisDomain;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DomainRepositorys extends CrudRepository<RedisDomain , Long> {
}
