package com.stackroute.queryengine.service;

import com.stackroute.queryengine.domain.employee.Employee;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class FetchJson {
    private final static  String url="http://10.20.1.211:8090/matchmaker/v1/employees/";     // This hardcode is for testing

    Logger logger = LoggerFactory.getLogger(FetchJson.class);

    public Employee getAllData(String userId){
        logger.info("----------------------------Fetching JSON --------------------------------");
        RestTemplate restTemplate = new RestTemplate();
        Employee result = restTemplate.getForObject(url+userId, Employee.class);
        logger.info("Fetched Json: {}",result);
        return result;
    }
}

