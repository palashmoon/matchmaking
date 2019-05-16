package com.stackroute.downstreamservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//This class is to model all possible incoming chicklets

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chicklets {
    private Qualification qualification;
    private Institution institution;
    private String summary;
    private Skills skill;
    private Certificate certificateDetails;
    private Experience experienceDetails;
    private ProjectDetails projectDetails;
    private CurrentLocation currentLocation;
    private PastLocation[] pastLocation;
}
