package com.example.community.repository;

import com.example.community.domain.Location;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface LocationRepository extends Neo4jRepository<Location, Long> {
    @Query("match(n:Location)<-[r:is_in]-(p) return p")
    List<Location> getAllLocation();
}
