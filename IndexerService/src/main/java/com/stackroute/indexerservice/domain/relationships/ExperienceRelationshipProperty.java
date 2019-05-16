package com.stackroute.indexerservice.domain.relationships;

import com.stackroute.indexerservice.domain.Organization;
import com.stackroute.indexerservice.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.*;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RelationshipEntity(type = "works_in")
public class ExperienceRelationshipProperty  {
    @Id
    private String relationship;
    @Property
    private String duration;

    @StartNode
    private User user;
    @EndNode
    private Organization organization;
}
