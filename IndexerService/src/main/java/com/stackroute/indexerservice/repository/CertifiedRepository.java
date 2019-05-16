package com.stackroute.indexerservice.repository;


import com.stackroute.indexerservice.domain.relationships.CertificateRelationshipProperty;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface CertifiedRepository extends Neo4jRepository<CertificateRelationshipProperty,String> {
    @Query("match(u:User{userId:{user}})-[r:certified_in]->(o:Organization{name:{certificate}})" +
            "delete r ")
    public void deleteNode(@Param("user") String user,@Param("certificate") String certificate);
}
