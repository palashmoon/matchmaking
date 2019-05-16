package com.stackroute.cacheservice.repository;

import com.stackroute.cacheservice.domain.Skill;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SkillRepository  extends Neo4jRepository<Skill,Long> {
    @Query("match(n:Skill)-[:part_whole_of]-(p) return p")

    List<Skill> getAllSkills();
}
