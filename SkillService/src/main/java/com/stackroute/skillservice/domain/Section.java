package com.stackroute.skillservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*Defining sections*/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Section {
    String sectionId;
    String userId;
    String operationType;
    Chicklet[] chicklets;
}
