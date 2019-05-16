package com.stackroute.experienceservice.config;

import com.stackroute.experienceservice.domain.CommonOutput;
import com.stackroute.experienceservice.domain.KafkaProperties;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

/*
 *  KafkaProducer class is used to produce data to a
 *  particular topic
 */
@Configuration
public class KafkaProducer {
    private KafkaProperties kafkaProperties;

    /*
     *  Method is used to get kafka properties (kafka Ip address
     *  ,kafka port, groupID)
     */
    @Autowired
    public void setApp(KafkaProperties kafkaProperties){
        this.kafkaProperties=kafkaProperties;
    }

    /*
     *  Method is used to set kafka producer config properties
     *  (kafka Ip address).
     */
    @Bean
    public ProducerFactory<String, CommonOutput> producerFactory() {

        Map<String, Object> config =new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS,false);
        return new DefaultKafkaProducerFactory(config);

    }

    /*
     *  Method is used to create default kafka template.
     */
    @Bean
    public KafkaTemplate<String, CommonOutput> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}

