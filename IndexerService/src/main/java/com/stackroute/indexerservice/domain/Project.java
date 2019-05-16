package com.stackroute.indexerservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.springframework.stereotype.Component;

/*
    The domain is responsible for mapping project and user
 */
@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NodeEntity
public class Project {
    @Id
    private String name;
}
