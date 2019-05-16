package com.stackroute.tokenizer.producer;
import com.stackroute.tokenizer.domain.KafkaProperties;
import com.stackroute.tokenizer.domain.Output;
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

/*KafkaProducer class is used to produce data to a
  particular topic*/

@Configuration
public class KafkaProducer {
    @Autowired
    KafkaProperties kafkaProperties;

    /* Used to set kafka producer config properties
       (kafka Ip address).*/

    @Bean
    public ProducerFactory<String, Output> producerFactory() {

        Map<String, Object> config =new HashMap<String, Object>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS,false);

        return new DefaultKafkaProducerFactory(config);
    }

   /* Used to create default kafka template.*/

    @Bean
    public KafkaTemplate<String, Output> kafkaTemplate() {
        return new KafkaTemplate<String,Output>(producerFactory());
    }

}