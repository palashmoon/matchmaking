package com.stackroute.experienceservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class MatchMakingApplication {

	public static void main(String[] args) {
		SpringApplication.run(MatchMakingApplication.class, args);
	}
}
