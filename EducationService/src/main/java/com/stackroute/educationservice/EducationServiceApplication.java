package com.stackroute.educationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class EducationServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EducationServiceApplication.class, args);
	}
}
