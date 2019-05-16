package com.stackroute.indexerservice.service.experience;


import com.stackroute.indexerservice.domain.input.CommonOutput;

public interface ExperienceService {
    public void createNode(CommonOutput commonOutput);
    public void deleteNode(CommonOutput commonOutput);
    public void updateNode(CommonOutput commonOutput);
}
