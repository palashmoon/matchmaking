package com.stackroute.educationservice.listener;

import com.stackroute.educationservice.domain.KafkaProperties;
import com.stackroute.educationservice.domain.Section;
import com.stackroute.educationservice.resource.IndexResource;

import com.stackroute.educationservice.domain.CommonOutput;
import com.stackroute.educationservice.service.EducationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

/*
 *  KafkaConsumer class will listen to education topic in kafka.
 */
@Service
public class KafkaConsumer {


    Logger logger= LoggerFactory.getLogger(KafkaConsumer.class);
    @Autowired
    EducationService educationService;

    private KafkaProperties kafkaProperties;

    /*
     *  Used to consume data from education topic in json
     *  format.
     */
    @KafkaListener(topics = "${kafka.linsteningTopic}" ,groupId = "${kafka.groupId}",
            containerFactory="${kafka.containerFactory}")
    public void consumeJson(@Payload Section section ) {

        logger.debug(Marker.ANY_MARKER,section);
        // System.out.println("consumed json message "+section);
        educationService.processEducationDetails(section);
    }
}