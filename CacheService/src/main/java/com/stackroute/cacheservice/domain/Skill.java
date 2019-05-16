package com.stackroute.cacheservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

@NodeEntity
public class Skill {
    @GraphId
    private Long Id;
    private String Name;
}
