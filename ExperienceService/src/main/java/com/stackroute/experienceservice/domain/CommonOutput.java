package com.stackroute.experienceservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

/*
 *  CommonOutput class is for sending output to kafka
 *  indexer topic in this format.
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

