package com.stackroute.tokenizer.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/*
This class is used to assign kafka properties from the application.yml
file
*/

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ConfigurationProperties("kafka")
public class KafkaProperties {

    private String ipAddress;
    private String groupId;
    private String outputTopic;
    private String listeningTopic;

}

