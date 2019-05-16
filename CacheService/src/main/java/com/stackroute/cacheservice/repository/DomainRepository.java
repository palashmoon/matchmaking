package com.stackroute.cacheservice.repository;

import com.stackroute.cacheservice.domain.Domain;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DomainRepository extends Neo4jRepository<Domain,Long> {

    @Query("match(n:Domain) return n")
    List<Domain> getAllDomain();
}
