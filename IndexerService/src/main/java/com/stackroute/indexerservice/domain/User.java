package com.stackroute.indexerservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.springframework.stereotype.Component;

/*
The user class for creating the user node and mapping with different ontology
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@NodeEntity
@Component
public class User
{       @Id
        private String userId;

}
