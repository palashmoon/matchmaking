package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisExperience;
import com.stackroute.cacheservice.domain.Node;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface ExpService {

    public RedisExperience saveExperience(RedisExperience experience);
    public List<RedisExperience> getAllRedisExperience();
    public List<RedisExperience> searchOrganization(String term);
}
