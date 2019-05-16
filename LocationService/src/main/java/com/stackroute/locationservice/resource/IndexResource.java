package com.stackroute.locationservice.resource;

import com.stackroute.locationservice.domain.CommonOutput;

/*
Loosely coupling it with Kafka so that it could be changed for the future
 */
public interface IndexResource {
        void postData(CommonOutput commonOutput);
}
