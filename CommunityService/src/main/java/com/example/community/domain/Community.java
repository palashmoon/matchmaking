package com.example.community.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.neo4j.ogm.annotation.NodeEntity;
import org.springframework.stereotype.Component;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NodeEntity
@Component
public class Community{

    Location location;
    Interest interest;

}
