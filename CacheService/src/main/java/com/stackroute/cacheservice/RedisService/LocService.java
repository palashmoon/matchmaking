package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisLocation;

import java.util.List;

public interface LocService {

    public RedisLocation saveLocation(RedisLocation location);
    public List<RedisLocation> getAllRedisLocation();
    public List<RedisLocation> cityAutoComplete(String term);
}
