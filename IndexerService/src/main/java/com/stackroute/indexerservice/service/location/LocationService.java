package com.stackroute.indexerservice.service.location;


import com.stackroute.indexerservice.domain.input.CommonOutput;

public interface LocationService {
    public void createNode(CommonOutput commonOutput);
    public void deleteNode(CommonOutput commonOutput);
    public void updateNode(CommonOutput commonOutput);
}
