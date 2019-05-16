package com.stackroute.educationservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
