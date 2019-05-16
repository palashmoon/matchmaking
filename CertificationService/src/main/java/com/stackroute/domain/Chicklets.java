package com.stackroute.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/*
Collections of certificate details
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chicklets {
    private Certificate certificateDetails;
}
