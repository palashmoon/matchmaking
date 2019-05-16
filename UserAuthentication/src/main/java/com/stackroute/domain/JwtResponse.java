package com.stackroute.domain;

import lombok.*;

// The jwt response class

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JwtResponse {
    String token;
    String email;
    String role;
}
