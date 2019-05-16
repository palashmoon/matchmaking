package com.stackroute.QueryService.domain;


import lombok.*;
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

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public void setOutputTopic(String outputTopic) {
        this.outputTopic = outputTopic;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public String getGroupId() {
        return groupId;
    }

    public String getOutputTopic() {
        return outputTopic;
    }
}
