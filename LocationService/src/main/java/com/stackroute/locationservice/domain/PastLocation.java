package com.stackroute.locationservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
Past location Details class
 */

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PastLocation {
    private String pastLocationId;
    private String cityName;
    private String stateName;
    private String pincode;
}
