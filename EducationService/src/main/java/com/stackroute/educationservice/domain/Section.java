package com.stackroute.educationservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;

/*
 *  Section class is input format which comes from
 *  kafka education topic.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Section {

    private String sectionId;
    @Id
    private String userId;
    @NotNull
    private String operationType;
    private Chicklets[] chicklets;
}
