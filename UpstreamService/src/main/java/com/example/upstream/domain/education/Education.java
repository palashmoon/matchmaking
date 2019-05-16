package com.example.upstream.domain.education;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Education {
    String sectionId;
    String userId;
    String operationType;
    Chicklets chicklets[];

}
