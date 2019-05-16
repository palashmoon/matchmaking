package com.stackroute.downstreamservice.exceptions;


/*This is a custom exception class to be thrown when a
particular employee  data already exists and attempt to override
is avoided
 */

public class EmployeeAlreadyExistsException extends  Exception {
    public EmployeeAlreadyExistsException(String message) {
        super(message);
    }
}
