package com.stackroute.projectservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/* kafka properties class to be used to configure kafka */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Component
@ConfigurationProperties("kafka")
public class KafkaProperties {
    private String ipAddress;
    private String groupId;
    private String outputTopic;
    private String listeningTopic;
}

