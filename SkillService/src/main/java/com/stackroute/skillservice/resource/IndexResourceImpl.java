package com.stackroute.skillservice.resource;

import com.stackroute.skillservice.domain.CommonOutput;
import com.stackroute.skillservice.domain.KafkaProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/*
It is an implementation of index resource interface which is
responsible for producing the data in the Indexer topic
 */
@Service
public class IndexResourceImpl implements IndexResource{

    @Autowired
    private KafkaTemplate<String , CommonOutput> kafkaTemplate;

    private KafkaProperties kafkaProperties;
    @Autowired
    public void setApp(KafkaProperties kafkaProperties){
        this.kafkaProperties = kafkaProperties;
    }

    public void postData(CommonOutput commonOutput){

        kafkaTemplate.send(kafkaProperties.getOutputTopic(), commonOutput);
    }

}
