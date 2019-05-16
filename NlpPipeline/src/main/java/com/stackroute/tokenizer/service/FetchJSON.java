package com.stackroute.tokenizer.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/*This class is for fetching data from redis*/

@Component
public class FetchJSON {

private final static  String url="http://10.20.1.211:8008/api/v1/output";     // This hardcode is for testing

    Logger logger = LoggerFactory.getLogger(FetchJSON.class);
    public String  getAllData(){
        logger.info("----------------------------Fetching JSON --------------------------------");
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(url, String.class);
        logger.info("Fetched Json: {}",result);
        return result;
    }
}
