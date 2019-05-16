package com.stackroute.indexerservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.springframework.stereotype.Component;

/*
this model is responsible for the mapping of company domain and project name

 */
@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Domain {
    @Id
    private String name;
}
