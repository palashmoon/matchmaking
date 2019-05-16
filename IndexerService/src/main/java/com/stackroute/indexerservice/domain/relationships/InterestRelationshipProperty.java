package com.stackroute.indexerservice.domain.relationships;


import com.stackroute.indexerservice.domain.Interest;
import com.stackroute.indexerservice.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RelationshipEntity(type = "interest_in")

public class InterestRelationshipProperty {
    @Id
    private String relationship;

    @StartNode
    private User user;
    @EndNode
    private Interest interest;
}
