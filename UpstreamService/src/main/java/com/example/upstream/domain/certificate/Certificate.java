package com.example.upstream.domain.certificate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Certificate {
    private String sectionId;
    private String userId;
    private String operationType;
    private Chicklets[] chicklets;
}
