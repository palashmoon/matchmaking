package com.stackroute.indexerservice.domain.relationships;

import com.stackroute.indexerservice.domain.Project;
import com.stackroute.indexerservice.domain.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RelationshipEntity(type = "technology_used")
public class TechnologyUsedRelationshipProperty {
    @Id
    private String relationship;

    @StartNode
    private Project project;

    @EndNode
    private Skill skill;
}
