package com.stackroute.resource;

import com.stackroute.domain.CommonOutput;
import com.stackroute.domain.KafkaProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/*
It is an implementation of index resource interface which is
responsible for producing the data in the Indexer topic
 */
@Service
public class IndexResourceImplementation implements IndexResource {
    @Autowired
    private KafkaTemplate<String, CommonOutput> kafkaTemplate;

    @Autowired
    private KafkaProperties kafkaProperties;

    public void postData(CommonOutput commonOutput)
    {
        kafkaTemplate.send(kafkaProperties.getOutputTopic(),commonOutput);
    }
}
