package com.stackroute.skillservice.service;

import com.stackroute.skillservice.domain.*;
import com.stackroute.skillservice.resource.IndexResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillServiceImpl implements SkillService {

    Logger logger= LoggerFactory.getLogger(SkillService.class);
    @Autowired
    private CommonOutput commonOutput;
    @Autowired
    private IndexResource indexResource;
    @Autowired
    private TargetProperty[] targetProperties;
    @Autowired
    private Property[] properties;

    @Override
    public void processSameOutput(Section section) {

        logger.info("skills "+section.toString());
        commonOutput.setOperationType(section.getOperationType());
        commonOutput.setSourceNode(section.getUserId());
        commonOutput.setSourceNodeProperty(null);
        commonOutput.setRelationships("skills_in");
        commonOutput.setTargetNode("skill");
        for(int i=0;i<section.getChicklets().length;i++)
        {
            targetProperties[0].setName(section.getChicklets()[i].getSkill().getSkillName());
            properties[0].setPropertyName("level");
            properties[0].setPropertyValue(section.getChicklets()[i].getSkill().getSkillLevel());
            commonOutput.setTargetNodeProperty(targetProperties);
            commonOutput.setProperties(properties);
            indexResource.postData(commonOutput);
        }
    }
}
