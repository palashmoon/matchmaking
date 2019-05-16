package com.stackroute.cacheservice.RedisDomain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RedisHash("RedisQualification")
public class RedisQualification {
    @Id
    private Long Id;
    private String Name;
}
