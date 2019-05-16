package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.ProjectClientRelationshipProperty;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ProjectForRepository extends Neo4jRepository<ProjectClientRelationshipProperty,String> {
}
