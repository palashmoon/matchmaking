package com.stackroute.indexerservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.springframework.stereotype.Component;

/*
This model is responsible  mapping skill and user
 */
@Component
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Skill {
    @Id
    private String name;
}
