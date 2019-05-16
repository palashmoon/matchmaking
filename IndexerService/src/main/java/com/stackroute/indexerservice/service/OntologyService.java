package com.stackroute.indexerservice.service;

import com.stackroute.indexerservice.domain.input.CommonOutput;


public interface OntologyService {
    public void createNode(CommonOutput commonOutput);
    public void deleteNode(CommonOutput commonOutput);
    public void updateNode(CommonOutput commonOutput);
}
