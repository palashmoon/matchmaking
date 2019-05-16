package com.stackroute.projectservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/* This is a common output class to be sent to the indexer*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommonOutput {
    private String operationType;
    private String sourceNode;
    private String sourceNodeProperty;
    private String targetNode;
    private TargetNodeProperty[] targetNodeProperty;
    private String relationships;
    private Property[] properties;
}
