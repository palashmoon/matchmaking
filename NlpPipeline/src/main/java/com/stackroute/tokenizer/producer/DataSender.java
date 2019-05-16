package com.stackroute.tokenizer.producer;

import com.stackroute.tokenizer.domain.KafkaProperties;
import com.stackroute.tokenizer.domain.Output;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class DataSender{
    @Autowired
    KafkaTemplate<String, Output> kafkaTemplate;
    @Autowired
    KafkaProperties kafkaProperties;
    public void postData(Output tokens)
    {
        kafkaTemplate.send(kafkaProperties.getOutputTopic(),tokens);
    }

 }