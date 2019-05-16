package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisDomain;

import java.util.List;

public interface DomainServices {
    public RedisDomain saveDomain(RedisDomain domain);
    public List<RedisDomain> getAllRedisDomain();
    public List<RedisDomain> searchDomain(String term);
}
