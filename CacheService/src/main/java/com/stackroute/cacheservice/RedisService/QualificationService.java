package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisEducation;
import com.stackroute.cacheservice.RedisDomain.RedisQualification;

import java.util.List;

public interface QualificationService {
    public RedisQualification saveQualification(RedisQualification qualification);
    public List<RedisQualification> getAllRedisQualification();
    public List<RedisQualification> searchQualification();
}
