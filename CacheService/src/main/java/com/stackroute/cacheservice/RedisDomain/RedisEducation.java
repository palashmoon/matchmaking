package com.stackroute.cacheservice.RedisDomain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.lang.annotation.Documented;
import java.security.PrivateKey;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@RedisHash("RedisEducation")
public class RedisEducation implements Serializable {
    @Id
    private Long Id;
    private String Name;
}
