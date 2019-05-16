package com.stackroute.projectservice.service;


import com.stackroute.projectservice.domain.*;
import com.stackroute.projectservice.resource.IndexResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/* This service is used
to create the common output that will be send
to 'indexer' kafka topic. Here we process
the data from front end and create an
object for indexing data to the graphdb (neo4j)*/
@Service
public class ProjectServiceImpl implements ProjectService {
    private CommonOutput commonOutput = new CommonOutput();
    private IndexResource indexResource;

    Logger logger= LoggerFactory.getLogger(ProjectServiceImpl.class);

    @Autowired
    public ProjectServiceImpl(IndexResource indexResource){
        this.indexResource = indexResource;
    }

    @Override
    public void processProjectDetails(Section section){

        logger.info("project "+section.toString());

        Skill[] skills = section.getChicklets()[0].getProjectDetails().getTechnologiesUsed();
        Property[] properties = new Property[3];
        TargetNodeProperty[] targetNodeProperties = new TargetNodeProperty[skills.length + 4];

        Property property1= Property.builder().propertyName("From").
                propertyValue(section.getChicklets()[0].getProjectDetails().getFromDate()).build();
        Property property2= Property.builder().propertyName("to").
                propertyValue(section.getChicklets()[0].getProjectDetails().getToDate()).build();
        Property property3= Property.builder().propertyName("role").
                propertyValue(section.getChicklets()[0].getProjectDetails().getRole()).build();
        properties[0] = property1;
        properties[1] = property2;
        properties[2] = property3;

        targetNodeProperties[0]= TargetNodeProperty.builder().name(section.getChicklets()[0].getProjectDetails().getTitle()).build();
        targetNodeProperties[1] = TargetNodeProperty.builder().name(section.getChicklets()[0].getProjectDetails().getCompany()).build();
        targetNodeProperties[2] = TargetNodeProperty.builder().name(section.getChicklets()[0].getProjectDetails().getClient()).build();
        targetNodeProperties[3] = TargetNodeProperty.builder().name(section.getChicklets()[0].getProjectDetails().getDomain()).build();
        for(int i = 4 ; i<skills.length + 4; i++){
            targetNodeProperties[i] = TargetNodeProperty.builder().name(skills[i-4].getSkill()).build();
        }
        commonOutput.setOperationType(section.getOperationType().toLowerCase());
        commonOutput.setSourceNode(section.getUserId().toLowerCase());
        commonOutput.setSourceNodeProperty(null);
        commonOutput.setTargetNode("project");
        commonOutput.setTargetNodeProperty(targetNodeProperties);
        commonOutput.setRelationships("project_in");
        commonOutput.setProperties(properties);

        logger.info(commonOutput.toString());

        indexResource.postData(commonOutput);

    }

}
