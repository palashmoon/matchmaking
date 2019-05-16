package com.stackroute.listener;

import com.stackroute.domain.*;
import com.stackroute.resource.IndexResource;
import com.stackroute.service.CertificateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/*
    this service is for consuming the data from topic
    certificate and passing it to index resource which
    is responsible for producing to the indexer kafka topic
 */
@Service
public class KafkaListening {
    Logger logger= LoggerFactory.getLogger(KafkaListening.class);

    @Autowired
    CertificateService certificateService;

    @KafkaListener(topics = "${kafka.listeningTopic}" ,groupId = "${kafka.groupId}",
            containerFactory="${kafka.containerFactory}")

    public void consumeJson(@Payload Section section) {
        logger.debug(Marker.ANY_MARKER,section);
        certificateService.processCertificateDetails(section);

    }
}
