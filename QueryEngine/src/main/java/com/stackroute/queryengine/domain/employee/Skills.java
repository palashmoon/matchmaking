package com.stackroute.queryengine.domain.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//This class is to model the  skills data

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skills {

    private String skillId;
    private String skillName;
    private String skillLevel;
}
