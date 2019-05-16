package com.stackroute.locationservice.listener;

import com.stackroute.locationservice.domain.KafkaProperties;
import com.stackroute.locationservice.domain.CommonOutput;
import com.stackroute.locationservice.domain.Section;
import com.stackroute.locationservice.resource.IndexResource;
import com.stackroute.locationservice.service.LocationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

/*
    Class for consuming the data from kafka topic
    'location' and passing it to index resource which
    is responsible for producing to the 'indexer' kafka topic
 */
@Service
public class KafkaListen {

    Logger logger= LoggerFactory.getLogger(KafkaListen.class);
    @Autowired
    LocationService locationService;


    @Autowired
    private KafkaProperties kafkaProperties;
    public void setApp(KafkaProperties kafkaProperties){
        this.kafkaProperties = kafkaProperties;
    }

    @KafkaListener(topics = "${kafka.listeningTopic}" ,groupId = "${kafka.groupId}",
            containerFactory="${kafka.containerFactory}")


    public void consumeJson(@Payload Section section) {

        logger.debug(Marker.ANY_MARKER,section);
        locationService.processLocationDetails(section);
    }
}
