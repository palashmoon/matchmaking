package com.example.community.service;

import com.example.community.domain.Community_user;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.validation.constraints.NotNull;

@Component
public class PostJson {

        private final static  String url="http://10.20.1.211:8097/downstream-service/matchmaker/v1/community/employees/";
        // This hardcode is for testing

        public void sendAllData(Community_user community_user){
            RestTemplate restTemplate = new RestTemplate();

            restTemplate.postForLocation(url,community_user);
        }

        // public static void main(String[] args) {
        // Employee employee=new FetchJson().getAllData("palashmoon8@gmail.com");
        // }
    }



