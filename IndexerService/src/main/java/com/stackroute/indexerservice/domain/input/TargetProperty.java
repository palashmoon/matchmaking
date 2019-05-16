package com.stackroute.indexerservice.domain.input;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

/*
    This stores the node details with which the user node will be connected
 */
@Component
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TargetProperty {
    private String name;
}
