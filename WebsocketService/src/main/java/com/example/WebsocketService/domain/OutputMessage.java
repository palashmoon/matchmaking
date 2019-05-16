package com.example.WebsocketService.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OutputMessage {
    private String from;
    private Employee employee;
    private Date date;
}
