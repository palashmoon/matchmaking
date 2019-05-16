package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.InterestRelationshipProperty;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface InterestRepository extends Neo4jRepository<InterestRelationshipProperty,String> {

    @Query("match(u:User{userId:{user}})-[r:interest_in]->(o:Interest{name:{interest}})" +
            "delete r ")
    public void deleteNode(@Param("user") String user, @Param("interest") String education);
}
