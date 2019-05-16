package com.stackroute.indexerservice.service.projects;

import com.stackroute.indexerservice.domain.input.CommonOutput;

public interface ProjectService {
    public void createNode(CommonOutput commonOutput);
    public void deleteNode(CommonOutput commonOutput);
    public void updateNode(CommonOutput commonOutput);
}
