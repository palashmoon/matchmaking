package com.stackroute.queryengine.domain.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/* This is domain class for modelling the employee documents
in the database
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    private String userId;

    private String email;
    private String name;

    private List<Education> educations;

    private List<Skills> skills;

    private Location location;
    private List<Experience> experiences;
    private List<ProjectDetails> projects;
    private List<Certificate> certificates;
    private String interest;
    private BasicInfo basicInfo;
    private List<String> communities;

}
