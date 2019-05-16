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
@AllArgsConstructor
@NoArgsConstructor
@NodeEntity
//@RedisHash("Node")
public class Node implements Serializable {

    @GraphId
    private Long Id;
    private String Name;
}
