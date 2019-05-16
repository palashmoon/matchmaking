package com.example.upstream.domain.location;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
