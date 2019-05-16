package com.stackroute.service;

import com.stackroute.domain.User;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

// To save User
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

// Find user by email

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

//Kafka Listener

@KafkaListener(topics = "${kafka.listeningTopic}" ,groupId = "${kafka.groupId}",
        containerFactory="${kafka.containerFactory}")
    public void getUserFrmTopic(@Payload User user) {
       user.setRole("consumer");
        userRepository.save(user);
    }
}

