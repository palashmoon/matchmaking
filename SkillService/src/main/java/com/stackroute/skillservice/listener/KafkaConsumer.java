package com.stackroute.skillservice.listener;




/*
    It is the class for consuming the data from topic
    certificate and passing it to index resource which
    is responsible for producing to the indexer kafka topic
 */
import com.stackroute.skillservice.domain.Relationship;
import com.stackroute.skillservice.domain.CommonOutput;
import com.stackroute.skillservice.domain.Section;
import com.stackroute.skillservice.resource.IndexResource;
import com.stackroute.skillservice.service.SkillService;
import com.stackroute.skillservice.service.SkillServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @Autowired
    private SkillService skillService;


    @KafkaListener(topics = "${kafka.linsteningTopic}", groupId ="${kafka.groupId}",

            containerFactory = "${kafka.containerFactory}")

    public void consumeJson(@Payload Section section) {
    skillService.processSameOutput(section);

          }

}