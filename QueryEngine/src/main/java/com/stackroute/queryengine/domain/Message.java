package com.stackroute.queryengine.domain;

import com.stackroute.queryengine.domain.employee.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    private String from;
    private Employee employee;
}

