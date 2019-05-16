package com.stackroute.indexerservice.domain.relationships;

import com.stackroute.indexerservice.domain.Organization;
import com.stackroute.indexerservice.domain.Project;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RelationshipEntity(type = "project_by")
public class ProjectCompanyRelationshipProperty {
    @Id
    private String relationship;

    @StartNode
    private Project project;

    @EndNode
    private Organization organization;
}
