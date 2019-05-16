package com.example.WebsocketService.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//This class is to model the instutition data of educations data
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Institution {

    private String institutionId;
    private String institutionName;
    private String startDate;
    private String endDate;

}


