package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.ExperienceRelationshipProperty;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface WorksRepository extends Neo4jRepository<ExperienceRelationshipProperty,String> {

    @Query("match(u:User{userId:{user}})-[r:works_in]->(o:Organization{name:{company}})" +
            "delete r ")
    public void deleteNode(@Param("user") String user, @Param("company") String company);
}
