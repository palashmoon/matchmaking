package com.example.upstream.domain.project;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Section {
    private String sectionId;
    private String userId;
    private String operationType;
    private Chicklets[] chicklets;
}
