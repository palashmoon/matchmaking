package com.stackroute.skillservice.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*Defining skill details*/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chicklet {
    Skill skill;
}
