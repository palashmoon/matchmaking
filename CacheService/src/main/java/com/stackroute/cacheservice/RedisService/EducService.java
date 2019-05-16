package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisEducation;

import java.util.List;

public interface EducService {

    public RedisEducation saveEducation(RedisEducation Education);
    public List<RedisEducation> getALlRedisEducation();
    public List<RedisEducation> searchCollege(String term);

}
