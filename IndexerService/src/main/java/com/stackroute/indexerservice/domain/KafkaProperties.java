package com.stackroute.indexerservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/*To remove the hard coded data of the kafka this class is configured and required configuration written in applicaton.yml

 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Component
@ConfigurationProperties("kafka")
public class KafkaProperties {
    private String ipAddress;
    private String groupId;
    private String listeningTopic;
}
