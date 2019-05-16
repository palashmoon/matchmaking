package com.stackroute.config;

import com.stackroute.domain.CommonOutput;
import com.stackroute.domain.KafkaProperties;
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
Configuration class for producing the data
 */
@Configuration
public class KafkaProducer {
    @Autowired
    KafkaProperties kafkaProperties;
    @Bean
    public ProducerFactory<String,CommonOutput> producerFactory() {

        Map<String, Object> config =new HashMap<String, Object>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS,false);

        return new DefaultKafkaProducerFactory(config);

    }

    @Bean
    public KafkaTemplate<String, CommonOutput> kafkaTemplate() {
        return new KafkaTemplate<String, CommonOutput>(producerFactory());
    }
}
