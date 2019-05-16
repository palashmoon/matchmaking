package com.stackroute.cacheservice.RedisService;


import com.stackroute.cacheservice.RedisDomain.RedisOrganization;

import java.util.List;

public interface OrgService {
    public RedisOrganization saveOrganization(RedisOrganization organization);
    public List<RedisOrganization> getAllRedisOrganization();
    public List<RedisOrganization> searchOrganizations(String term);
}
