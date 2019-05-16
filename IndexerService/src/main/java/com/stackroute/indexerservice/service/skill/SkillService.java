package com.stackroute.indexerservice.service.skill;


import com.stackroute.indexerservice.domain.input.CommonOutput;

public interface SkillService {
    public void createNode(CommonOutput commonOutput);
    public void deleteNode(CommonOutput commonOutput);
    public void updateNode(CommonOutput commonOutput);
}
