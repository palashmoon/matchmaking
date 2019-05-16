package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisSkill;

import java.util.List;

public interface SkillServices {
    public RedisSkill saveSkill(RedisSkill skill);
    public List<RedisSkill> getAllRedisSkill();
    public List<RedisSkill> searchSkill(String term);
}
