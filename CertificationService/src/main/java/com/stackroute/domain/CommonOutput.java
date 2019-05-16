package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

/*
Class model for producing data in the indexer topic
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
