package com.stackroute.downstreamservice.exceptions;

/*This is a custom exception class to be thrown when a
particular employee is not registered and an attempt to write to  is
avoided
 */
public class EmployeeNotFoundException extends Exception{
    public EmployeeNotFoundException(String message) {
        super(message);
    }
}
