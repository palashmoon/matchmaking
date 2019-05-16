package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.EducationRelationshipProperty;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface EducatedRepository extends Neo4jRepository<EducationRelationshipProperty,String> {

    @Query("match(u:User{userId:{user}})-[r:qualified_from]->(o:Education{name:{education}})" +
            "delete r ")
    public void deleteNode(@Param("user") String user, @Param("education") String education);
}
