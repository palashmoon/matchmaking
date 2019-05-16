package com.stackroute.cacheservice.repository;



import com.stackroute.cacheservice.domain.Experience;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public interface ExperienceRepository extends Neo4jRepository<Experience,Long> {
//    @Query("match (a:Node)-[r:Comes_from]->(n:Node) return a,n")
//    Collection<Node> getAllExperience();
//
//
// 2. get all the childer through the quries
//@Query("match (a:Node)-[r:is_a]->(n:Node) return a,n")
//    Collection<Node> getAllExperience();

    @Query("match(n:Organization)<-[r:is_in]-(p)-[:provides]-(q) return r")
    List<Experience> getAllExperience();


//    @Cacheable("RedisEducation")
//    @Query("match(n:RedisEducation)<-[r:is_in]-(p)\n" +
//            "where n.name = 'Tier1' and p.name = 'IIT'\n" +
//            "return n,p,r")
//    Collection<RedisEducation> getAllEducation();
}
