package com.stackroute.queryengine.domain.employee;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//This class is to model the educations data

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {
    private Qualification qualification;
    private Institution institution;
    private String summary;
}
