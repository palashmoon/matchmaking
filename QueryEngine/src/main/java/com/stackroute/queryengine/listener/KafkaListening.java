package com.stackroute.queryengine.listener;

import com.stackroute.queryengine.domain.Output;

import com.stackroute.queryengine.service.QueryService;
import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class KafkaListening {

    Logger logger = LoggerFactory.getLogger(KafkaListening.class);

    @Autowired
    QueryService queryService;

    @KafkaListener(topics = "${kafka.listeningTopic}", groupId = "${kafka.groupId}",
            containerFactory = "${kafka.containerFactory}")

    public void consumeJson(@Payload Output output) {
        logger.info("kafka listend output: {}", output);
        Driver drive = GraphDatabase.driver("bolt://127.0.0.1:7687",
                AuthTokens.basic("neo4j","123456"));
        queryService.runquery(drive,output);

    }
}
