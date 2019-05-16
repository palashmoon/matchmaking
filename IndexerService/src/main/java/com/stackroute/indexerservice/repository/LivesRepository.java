package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.LocationRelationshipProperty;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface LivesRepository extends Neo4jRepository<LocationRelationshipProperty,String> {
    @Query("match(u:User{userId:{user}})-[r:lives_in]->(o:Location{name:{location}})" +
            "delete r ")
    public void deleteNode(@Param("user") String user, @Param("location") String location);
}
