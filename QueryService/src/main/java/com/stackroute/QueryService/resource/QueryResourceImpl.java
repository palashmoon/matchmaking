package com.stackroute.QueryService.resource;

import com.stackroute.QueryService.domain.QueryData;
import com.stackroute.QueryService.domain.KafkaProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

/*
It is an implementation of query resource interface which is
responsible for producing the data in the query topic of kafka
 */
@Service
public class QueryResourceImpl implements QueryResource {

    private KafkaTemplate<String , QueryData> kafkaTemplate;
    private KafkaProperties kafkaProperties;

    @Autowired
    public QueryResourceImpl(KafkaProperties kafkaProperties, KafkaTemplate kafkaTemplate){
        this.kafkaProperties = kafkaProperties;
        this.kafkaTemplate = kafkaTemplate;
    }

    public void postQuery(QueryData queryData){
        kafkaTemplate.send(kafkaProperties.getOutputTopic(), queryData);
    }
}