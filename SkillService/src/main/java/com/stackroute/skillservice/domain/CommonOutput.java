package com.stackroute.skillservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

/*Common output which is to be send to indexer*/
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