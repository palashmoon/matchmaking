package com.stackroute.queryengine.domain.employee;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//This class is to model the  qualifications data

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Qualification {

    private String qualificationId;
    private String title;

}
