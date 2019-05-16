package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
Certificate Details class
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Certificate {
    private String certificateName;
    private String certificateAuthority;
    private String licenseNumber;
    private String fromDate;
    private String toDate;
}
