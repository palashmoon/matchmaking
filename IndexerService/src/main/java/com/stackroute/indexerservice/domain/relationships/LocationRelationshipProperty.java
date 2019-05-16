package com.stackroute.indexerservice.domain.relationships;

import com.stackroute.indexerservice.domain.Location;
import com.stackroute.indexerservice.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.*;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RelationshipEntity(type = "lives_in")
public class LocationRelationshipProperty {

    @Id
    private String relationship;
    @Properties
    private Map<String,String> properties;

    @StartNode
    private User user;
    @EndNode
    private Location location;
}
