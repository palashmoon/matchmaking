package com.stackroute.indexerservice.domain.input;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

/*Class model of the common output the listener maps the incoming data to this domain

 */
@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommonOutput {
    private String operationType;
    private String sourceNode;
    private String sourceNodeProperty;
    private String targetNode;
    private TargetProperty[] targetNodeProperty;
    private String relationships;
    private Property[] properties;
}
