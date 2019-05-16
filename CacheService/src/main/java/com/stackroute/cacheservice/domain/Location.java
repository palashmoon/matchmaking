package com.stackroute.cacheservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NodeEntity
//@RedisHash("location")
public class Location implements Serializable {
    @GraphId
    private Long id;
    private String name;
}
