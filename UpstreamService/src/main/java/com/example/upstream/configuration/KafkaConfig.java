package com.example.upstream.configuration;

import com.example.upstream.domain.KafkaProperties;
import com.example.upstream.domain.basicdetails.BasicDetails;
import com.example.upstream.domain.certificate.Certificate;
import com.example.upstream.domain.education.Education;
import com.example.upstream.domain.experience.Experience;
import com.example.upstream.domain.location.Location;
import com.example.upstream.domain.project.Section;
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
//This class provides configuration on how to connect to kafka server and creates kafka template for each topic.
@Configuration
public class KafkaConfig {

    private KafkaProperties kafkaProperties;
    @Autowired
    public void setUP(KafkaProperties kafkaProperties)
    {
        this.kafkaProperties=kafkaProperties;
    }
    // Creating producer factory for each domain
    @Bean
    public ProducerFactory<String, Education> producerFactoryEducation() {

        Map<String, Object> config =new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        //System.out.println("${kafka.ipAddress}");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        return new DefaultKafkaProducerFactory(config);

    }
    @Bean
    public ProducerFactory<String, Location> producerFactoryLocation() {

        Map<String, Object> config =new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        return new DefaultKafkaProducerFactory(config);

    }
    @Bean
    public ProducerFactory<String, Experience> producerFactoryExperience() {

        Map<String, Object> config =new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        return new DefaultKafkaProducerFactory(config);

    }
    @Bean
    public ProducerFactory<String, com.example.upstream.domain.skills.Section> producerFactorySkill() {

        Map<String, Object> config =new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        return new DefaultKafkaProducerFactory(config);

    }
    @Bean
    public ProducerFactory<String, Section> producerFactoryProject() {

        Map<String, Object> config =new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        return new DefaultKafkaProducerFactory(config);

    }
    @Bean
    public ProducerFactory<String, Certificate> producerFactoryCertificate() {

        Map<String, Object> config = new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        return new DefaultKafkaProducerFactory(config);
    }
    @Bean
    public ProducerFactory<String, com.example.upstream.domain.interest.Section> producerFactoryInterest() {

        Map<String, Object> config =new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        //System.out.println("${kafka.ipAddress}");
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        return new DefaultKafkaProducerFactory(config);

    }
    @Bean
    public ProducerFactory<String, BasicDetails> producerFactoryBasicDetails() {

        Map<String, Object> config = new HashMap<>();

        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,kafkaProperties.getIpAddress());
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        config.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, false);

        return new DefaultKafkaProducerFactory(config);
    }
        //Creating templates for each objects
    @Bean
    public KafkaTemplate<String, Education> kafkaTemplateEducation()
    {
        return new KafkaTemplate<>(producerFactoryEducation());
    }
    @Bean
    public KafkaTemplate<String, Location> kafkaTemplateLocation()
    {
        return new KafkaTemplate<>(producerFactoryLocation());
    }
    @Bean
    public KafkaTemplate<String, Experience> kafkaTemplateExperience()
    {
        return new KafkaTemplate<>(producerFactoryExperience());
    }
    @Bean
    public KafkaTemplate<String, com.example.upstream.domain.skills.Section> kafkaTemplateSkills()
    {
        return new KafkaTemplate<>(producerFactorySkill());
    }
    @Bean
    public KafkaTemplate<String, Section> kafkaTemplateProject()
    {
        return new KafkaTemplate<>(producerFactoryProject());
    }
    @Bean
    public KafkaTemplate<String, Certificate> kafkaTemplateCertificate()
    {
        return new KafkaTemplate<>(producerFactoryCertificate());
    }
    @Bean
    public KafkaTemplate<String, com.example.upstream.domain.interest.Section> kafkaTemplateInterest()
    {
        return new KafkaTemplate<>(producerFactoryInterest());
    }
    @Bean
    public KafkaTemplate<String, BasicDetails> kafkaTemplateBasicDetails()
    {
        return new KafkaTemplate<>(producerFactoryBasicDetails());
    }
}
