package com.stackroute.cacheservice.repository;

import com.stackroute.cacheservice.domain.Location;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LocationRepository extends Neo4jRepository<Location, Long> {


    @Query("match(n:Location)<-[r:is_in]-(p) return p")
    List<Location> getAllLocation();

}
