package com.stackroute.queryengine.domain.employee;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

//This class is to model the locations data
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {
    private CurrentLocation currentLocation;
    private List<PastLocation> pastLocation;
}
