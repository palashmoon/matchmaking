package com.stackroute.indexerservice.service.interest;

import com.stackroute.indexerservice.domain.input.CommonOutput;

public interface InterestService {
    public void createNode(CommonOutput commonOutput);
    public void deleteNode(CommonOutput commonOutput);
    public void updateNode(CommonOutput commonOutput);
}
