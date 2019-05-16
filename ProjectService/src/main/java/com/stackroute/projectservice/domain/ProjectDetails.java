package com.stackroute.projectservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*  project details class*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetails {
    private String title;
    private String fromDate;
    private String toDate;
    private String projectUrl;
    private String domain;
    private String role;
    private String company;
    private String client;
    private Skill[] technologiesUsed;
    private String description;
}
