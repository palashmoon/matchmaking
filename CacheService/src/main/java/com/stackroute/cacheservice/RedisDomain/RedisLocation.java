package com.stackroute.cacheservice.RedisDomain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("RedisLocation")
public class RedisLocation implements Serializable {
    @Id
    private Long Id;
    private String Name;
}
