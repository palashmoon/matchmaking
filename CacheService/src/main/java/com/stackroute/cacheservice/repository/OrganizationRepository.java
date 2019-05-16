package com.stackroute.cacheservice.repository;

import com.stackroute.cacheservice.domain.Experience;
import com.stackroute.cacheservice.domain.Organization;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationRepository extends Neo4jRepository<Organization , Long> {
    @Query("match(n:Organization)<-[r:is_in]-(p) return p")
    List<Organization> getAllOrganization();
}
