package com.example.upstream.domain.project;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDetails {
    private String title;
    private String fromDate;
    private String toDate;
    private String projectUrl;
    private String role;
    private List<Skill> technologiesUsed;
    private String description;
    private String domain;
    private String company;
    private String client;
}
