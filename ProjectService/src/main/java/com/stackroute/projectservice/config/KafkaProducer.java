package com.stackroute.projectservice.config;

import com.stackroute.projectservice.domain.KafkaProperties;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.serializer.JsonSerializer;
import java.util.HashMap;
import java.util.Map;

/*
Configuration class for producing the data
 */
@Configuration
public class KafkaProducer {

    private KafkaProperties kafkaProperties;

    public KafkaProducer() {
    }

    @Autowired
    public void KafkaProducer(KafkaProperties kafkaProperties){
        this.kafkaProperties = kafkaProperties;
    }

    @Bean
    public DefaultKafkaProducerFactory producerFactory() {
        Map<String, Object> config =new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS,false);

        return new DefaultKafkaProducerFactory(config);

    }

    @Bean
    public KafkaTemplate kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}
