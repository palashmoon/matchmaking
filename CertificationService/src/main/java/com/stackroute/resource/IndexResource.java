package com.stackroute.resource;

import com.stackroute.domain.CommonOutput;

/*
Loosely coupling it with Kafka so that it could be changed for the future
 */
public interface IndexResource {
    public void postData(CommonOutput commonOutput);
}
