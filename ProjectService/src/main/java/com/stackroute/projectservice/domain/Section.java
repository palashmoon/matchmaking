package com.stackroute.projectservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/* section class is the input format for this service*/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Section {
    private String sectionId;
    private String userId;
    private String operationType;
    private Chicklets[] chicklets;
}
