package com.stackroute.cacheservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Property;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NodeEntity
//@RedisHash("RedisEducation")
public class Education {
    @GraphId
    private Long id;
    @Property
    private String Name;
}
