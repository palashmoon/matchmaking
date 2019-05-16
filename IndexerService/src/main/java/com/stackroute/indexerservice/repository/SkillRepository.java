package com.stackroute.indexerservice.repository;

import com.stackroute.indexerservice.domain.relationships.SkillRelationshipProperty;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface SkillRepository extends Neo4jRepository<SkillRelationshipProperty,String> {
    @Query("match(u:User{userId:{user}})-[r:skills_in]->(o:Skill{name:{skill}})" +
            "delete r ")
    public void deleteNode(@Param("user") String user, @Param("skill") String skill);
}
