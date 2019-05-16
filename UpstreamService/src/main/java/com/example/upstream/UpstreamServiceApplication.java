package com.example.upstream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class UpstreamServiceApplication {


	public static void main(String[] args) {
		SpringApplication.run(UpstreamServiceApplication.class, args);
	}
}
