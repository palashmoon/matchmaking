package com.stackroute.indexerservice.repository;


import com.stackroute.indexerservice.domain.relationships.ProjectRelationshipProperty;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends Neo4jRepository<ProjectRelationshipProperty,String> {
    @Query("MATCH(a:Project)\n" +
            "MATCH(m:Project) WHERE a.name = 'project' AND m.name = {name}\n" +
            "MERGE(a)-[:has_a]->(m)")
    public void saveNode(@Param("name") String name);

    @Query("MATCH (n{userId:{name}})-[r:project_in]->(o:Project{name:{project}})\n" +
            "DELETE r")
    public void deleteNode(@Param("name") String name,@Param("project") String project);
}
