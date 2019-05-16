package com.stackroute.skillservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*Main class for the microservice*/
//@EnableEurekaClient
@SpringBootApplication
public class SpringSkillApplication {

    static Logger logger= LoggerFactory.getLogger(SpringSkillApplication.class);
	public static void main(String[] args) {
	    logger.info("hello loggers");
		SpringApplication.run(SpringSkillApplication.class, args);
	}
}
