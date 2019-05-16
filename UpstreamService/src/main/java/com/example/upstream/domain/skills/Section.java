package com.example.upstream.domain.skills;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Section {
    String sectionId;
    String userId;
    String operationType;
    Chicklet chicklets[];
}
