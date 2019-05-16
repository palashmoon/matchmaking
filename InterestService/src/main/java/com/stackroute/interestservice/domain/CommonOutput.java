package com.stackroute.interestservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 *  CommonOutput class is for sending output to kafka
 *  indexer topic in this format.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonOutput {
    private String operationType;
    private String sourceNode;
    private String sourceNodeProperty;
    private String targetNode;
    private TargetNodeProperty[] targetNodeProperty;
    private String relationships;
    private Property[] properties;
}