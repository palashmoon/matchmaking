package com.stackroute.downstreamservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/* skill class to be used in project details*/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectSkill {
    private String skill;
    private String level;
}