package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/* It is the part of the common output class for defining the relationships of the node
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Relationships {
    private String relationshipProperty;
    private String relationshipType;
}
