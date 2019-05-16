package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/* Input type of the upstream data received*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Section {
    private String sectionId;
    private String userId;
    private String operationType;
    private Chicklets[] chicklets;
}
