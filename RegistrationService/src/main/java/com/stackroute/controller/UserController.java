package com.stackroute.controller;

import com.stackroute.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;
// Receiving data from registration front end and passing it to kafka

@RestController
@CrossOrigin("*")
@RequestMapping(value="${controller.base}")
public class UserController {
    @Autowired
    private KafkaTemplate<String, User> kafkaTemplate;
    private  static final String TOPIC ="user";

    @PostMapping("${controller.user}")
    public ResponseEntity<String> saveUser(@RequestBody User user){
        ResponseEntity responseEntity;
        try{
            kafkaTemplate.send(TOPIC,user);
            responseEntity=new ResponseEntity<String>( "Successfully created", HttpStatus.CREATED);
        }
        catch(Exception ex){
            responseEntity=new ResponseEntity<String>(ex.getMessage(), HttpStatus.CONFLICT);
        }
        return responseEntity;
    }
}
