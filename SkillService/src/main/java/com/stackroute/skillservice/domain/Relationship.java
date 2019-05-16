package com.stackroute.skillservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*Class to define relationship*/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Relationship {
    private String relationshipProperty;
    private String relationshipType;

}
