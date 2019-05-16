package com.stackroute.projectservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/* relationship class to make a relation between nodes in neo4j*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Relationship {
    private String relationshipType;
    private String relationshipProperty;
}