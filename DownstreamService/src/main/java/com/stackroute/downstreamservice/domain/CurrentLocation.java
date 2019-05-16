package com.stackroute.downstreamservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//This class is to model the current locations data

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CurrentLocation {
    private  String currentLocationId;
    private  String cityName;
    private String stateName;
    private String pincode;
}
