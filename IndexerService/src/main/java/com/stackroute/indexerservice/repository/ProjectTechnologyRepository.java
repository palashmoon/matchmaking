package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.TechnologyUsedRelationshipProperty;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ProjectTechnologyRepository extends Neo4jRepository<TechnologyUsedRelationshipProperty,String> {
}
