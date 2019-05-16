package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.ProjectDomainRelationshipProperty;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface InDomainRepository extends Neo4jRepository<ProjectDomainRelationshipProperty,String> {
}
