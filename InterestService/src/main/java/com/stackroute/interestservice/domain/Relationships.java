package com.stackroute.interestservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Relationships {
    private String relationshipProperty;
    private String relationshipType;
}
