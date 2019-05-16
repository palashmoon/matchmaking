package com.example.WebsocketService.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PastLocation {
    private  String pastLocationId;
    private  String cityName;
    private String stateName;
    private String pincode;
}
