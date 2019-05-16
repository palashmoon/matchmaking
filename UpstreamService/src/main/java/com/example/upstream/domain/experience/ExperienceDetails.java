package com.example.upstream.domain.experience;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceDetails {
    private String organisation;
    private String role;
    private String fromDate;
    private String fromMonth;
    private String fromYear;
    private String toDate;
    private String toMonth;
    private String toYear;
}