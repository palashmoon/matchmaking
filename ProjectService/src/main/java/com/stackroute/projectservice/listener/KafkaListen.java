package com.stackroute.projectservice.listener;

import com.stackroute.projectservice.domain.KafkaProperties;
import com.stackroute.projectservice.domain.Section;
import com.stackroute.projectservice.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;

/*
    Class for consuming the data from kafka topic
    'location' and passing it to index resource which
    is responsible for producing to the 'indexer' kafka topic
 */
@Service
public class KafkaListen {

    private ProjectService projectService;
    private KafkaProperties kafkaProperties;

    Logger logger= LoggerFactory.getLogger(KafkaListen.class);

    @Autowired
    public KafkaListen(KafkaProperties kafkaProperties, ProjectService projectService){
        this.kafkaProperties = kafkaProperties;
        this.projectService=projectService;
    }

    @KafkaListener(topics = "${kafka.listeningTopic}" ,groupId = "${kafka.groupId}",
            containerFactory="${kafka.containerFactory}")
    public void consumeJson(@Payload Section section) {
        logger.debug(Marker.ANY_MARKER,section);
        projectService.processProjectDetails(section);
    }
}
