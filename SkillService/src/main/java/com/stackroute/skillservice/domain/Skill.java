package com.stackroute.skillservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*Skill Data*/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill {
    String skillId;
    String skillName;
    String skillLevel;
}