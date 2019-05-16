package com.example.WebsocketService.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//This class is to model the certificate data
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
