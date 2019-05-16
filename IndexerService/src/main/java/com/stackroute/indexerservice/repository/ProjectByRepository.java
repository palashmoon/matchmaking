package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.ProjectCompanyRelationshipProperty;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ProjectByRepository extends Neo4jRepository<ProjectCompanyRelationshipProperty,String> {
}
