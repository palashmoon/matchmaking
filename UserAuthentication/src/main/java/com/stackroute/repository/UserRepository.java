package com.stackroute.repository;

import com.stackroute.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Repository layer

public interface UserRepository extends JpaRepository<User,String> {
    public User findByEmail(String email);
}
