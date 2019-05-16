package com.stackroute.cacheservice.repository;

import com.stackroute.cacheservice.domain.Education;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationRepository extends Neo4jRepository<Education, Long>{

  /*  @Cacheable("RedisEducation")
   *//* @Query("match(n:RedisEducation)<-[r:is_in]-(p)\n" +
            "where n.name = 'Tier1' and p.name = 'IIT'\n" +
            "return n,p,r")*//*
    Collection<RedisEducation> getAllEducation();*/


    @Query("match(n:Education)<-[r:is_in]-(p) return p")
// @Query("match(n:Organization)<-[r:is_in]-(p)-[:provides]-(q) return p,q")
    List<Education> getAllEducation();

    @Query("match(n:Education)<-[r:is_a]-(p) return p")
    List<Education> getAllQualification();
}
