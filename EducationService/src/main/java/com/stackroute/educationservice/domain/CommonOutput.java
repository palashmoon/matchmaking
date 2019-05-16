package com.stackroute.educationservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


/*
 *  CommonOutput class is for sending output to kafka
 *  indexer topic in this format.
 */
@Data
@Component
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonOutput {

    private String operationType;
    private String sourceNode;
    private String sourceNodeProperty;
    private String targetNode;
    private TargetProperty[] targetNodeProperty;
    private String relationships;
    private Property[] properties;

}
