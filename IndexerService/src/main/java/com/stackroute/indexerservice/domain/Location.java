package com.stackroute.indexerservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Index;
import org.springframework.stereotype.Component;
/*
this domain is responsible for mapping location and user
 */
@Component
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    @Id
    private String name;
}
