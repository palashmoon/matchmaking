package com.stackroute.cacheservice.RedisDomain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Output {
    private List<RedisEducation> education;
    private List<RedisLocation> locations;
    private List<RedisSkill> skills;
    private List<RedisOrganization> Organisations;
}
