package com.example.upstream.domain.education;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Chicklets {
    Institution institution;
    Qualification qualification;
    String summary;

   }
