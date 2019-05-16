package com.stackroute.indexerservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.springframework.stereotype.Component;

/*
    This domain is used for creating node of the education and linking with the user
 */
@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Education {
    @Id
    private String name;
}
