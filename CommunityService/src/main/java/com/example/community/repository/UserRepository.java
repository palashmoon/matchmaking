package com.example.community.repository;

import com.example.community.domain.Location;
import com.example.community.domain.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

import java.util.List;

public interface UserRepository extends Neo4jRepository<User,Long> {
    @Query("match(n:User) return n")
    List<User> getAllUser();
}
