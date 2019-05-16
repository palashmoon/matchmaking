package com.example.upstream.domain.basicdetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BasicDetails {
    public String userId;
    public String  userName;
    public String contactNumber;
    public String gender;
    public String  dateOfBirth;
    public String githubUrl;
    public String linkedinUrl;
}
