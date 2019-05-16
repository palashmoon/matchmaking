package com.stackroute.skillservice.config;


import com.stackroute.skillservice.domain.KafkaProperties;
import com.stackroute.skillservice.domain.Section;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.BytesDeserializer;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.converter.StringJsonMessageConverter;

import java.util.HashMap;
import java.util.Map;

/*Kafka consumer for consuming data from kafka message bus using consumer id*/
@EnableKafka
@Configuration
public class KafkaConfiguration {

    private KafkaProperties kafkaProperties;

    @Autowired
    public void setApp(KafkaProperties kafkaProperties){
        this.kafkaProperties=kafkaProperties;
    }


    @Bean
    public ConsumerFactory<String, String> consumerFactory() {

        Map<String, Object> config =new HashMap<>();

        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());

        config.put(ConsumerConfig.GROUP_ID_CONFIG, kafkaProperties.getGroupId());

        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);

        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,StringDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config);

    }

    @Bean

    public ConcurrentKafkaListenerContainerFactory<String,String> kafkaListenerContainerFactory() {

        ConcurrentKafkaListenerContainerFactory<String,String> factory=new ConcurrentKafkaListenerContainerFactory();

        factory.setConsumerFactory(consumerFactory());

        return factory;

    }

    @Bean

    public ConsumerFactory<String, Section> userConsumerFactory() {

        Map<String, Object> config =new HashMap<>();

        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());

        config.put(ConsumerConfig.GROUP_ID_CONFIG, kafkaProperties.getGroupId());

        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);


        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, BytesDeserializer.class);

        return new DefaultKafkaConsumerFactory<>(config);

    }


    @Bean

    public ConcurrentKafkaListenerContainerFactory<String,Section> userKafkaListenerFactory() {

        ConcurrentKafkaListenerContainerFactory<String,Section> factory=new ConcurrentKafkaListenerContainerFactory<>();

        factory.setConsumerFactory(userConsumerFactory());

        factory.setMessageConverter(new StringJsonMessageConverter());

        return factory;

    }

}

