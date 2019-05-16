package com.example.community.service;

import com.example.community.domain.User;
import com.example.community.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    UserRepository userRepository;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> getAllUser(){
        System.out.println("hjsdjskdjskdjsk" + userRepository.getAllUser());
        return userRepository.getAllUser();
    }
}
