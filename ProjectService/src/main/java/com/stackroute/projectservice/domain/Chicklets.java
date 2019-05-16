package com.stackroute.projectservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/* collections of project details class*/
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chicklets {
    private ProjectDetails projectDetails;
}
