package com.stackroute.downstreamservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;
/* This is domain class for modelling the employee documents
in the database
 */
@Document(collection="Employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    @NotNull
    private String userId;

    @NotNull
    private String email;

//    private String employeeName;
    @NotNull
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

   /* String[] skills;
    String[] experience;
    String[] project;
    String[] locations;
    String[] qualifications;
*/}
