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
@AllArgsConstructor
@NoArgsConstructor

@RedisHash("Node")
public class Node implements Serializable {
    @Id
    private Long Id;
    private String Name;
}
