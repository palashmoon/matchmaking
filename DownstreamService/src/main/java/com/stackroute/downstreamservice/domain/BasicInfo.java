package com.stackroute.downstreamservice.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasicInfo {
    private String dob;
    private String githubUrl;
    private String linkedinUrl;
    private String gender;
    private String contactNo;
}
