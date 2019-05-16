package com.stackroute.interestservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


/*
 *  Section class is input format which comes from
 *  kafka education topic.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Section {
    private String sectionId;
    private String userId;
    private String operationType;
    private Chicklets chicklets[];
}
