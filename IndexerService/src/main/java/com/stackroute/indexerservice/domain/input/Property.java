package com.stackroute.indexerservice.domain.input;


import lombok.*;
import org.springframework.stereotype.Component;

/*This model is responsible for the property of the relationship between the nodes

 */
@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    private String propertyName;
    private String propertyValue;
}
