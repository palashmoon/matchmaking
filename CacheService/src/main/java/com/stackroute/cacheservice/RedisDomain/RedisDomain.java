package com.stackroute.cacheservice.RedisDomain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RedisHash("RedisDomain")
public class RedisDomain implements Serializable {
    @Id
    private Long Id;
    private String Name;
}
