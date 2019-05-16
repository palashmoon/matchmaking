package com.stackroute.service;

import com.stackroute.domain.User;

// Service Layer

public interface UserService {
    User save(User user);

    User findByEmail(String email);
}
