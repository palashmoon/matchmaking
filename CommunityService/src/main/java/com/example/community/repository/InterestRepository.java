package com.example.community.repository;

import com.example.community.domain.Interest;
import com.example.community.domain.Location;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface InterestRepository extends Neo4jRepository<InterestRepository,Long> {
    @Query("match(n:Interest)<-[r:is_a]-(p) return p")
    List<Interest> getAllInterest();
}
