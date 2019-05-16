package com.stackroute.queryengine.domain.employee;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


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
    private String company;
    private String client;
    private ProjectSkill[] technologiesUsed;
    private String description;
}
