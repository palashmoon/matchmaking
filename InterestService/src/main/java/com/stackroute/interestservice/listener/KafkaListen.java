package com.stackroute.interestservice.listener;

import com.stackroute.interestservice.domain.CommonOutput;
import com.stackroute.interestservice.domain.KafkaProperties;
import com.stackroute.interestservice.domain.Relationships;
import com.stackroute.interestservice.domain.Section;
import com.stackroute.interestservice.resource.IndexResource;
import com.stackroute.interestservice.service.InterestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;


@Service
public class KafkaListen {
    private InterestService interestService;
    private KafkaProperties kafkaProperties;
    Logger logger= LoggerFactory.getLogger(KafkaListen.class);

    @Autowired
    public KafkaListen(KafkaProperties kafkaProperties, InterestService interestService){
        this.kafkaProperties = kafkaProperties;
        this.interestService= interestService;
    }

    @KafkaListener(topics="${kafka.linsteningTopic}",groupId = "${kafka.groupId}",containerFactory = "${kafka.containerFactory}")
    public void consumeJson(@Payload Section section)
    {
        logger.debug(Marker.ANY_MARKER,section);
        interestService.processInterestDetails(section);
    }
}