package com.stackroute.indexerservice.service.education;


import com.stackroute.indexerservice.domain.input.CommonOutput;

public interface EducationService {
    public void createNode(CommonOutput commonOutput);
    public void deleteNode(CommonOutput commonOutput);
    public void updateNode(CommonOutput commonOutput);
}
