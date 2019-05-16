package com.stackroute.educationservice.service;


import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.stackroute.educationservice.domain.*;
import com.stackroute.educationservice.resource.IndexResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/*
 *  EducationServiceImpl class is used to process input
 *  data(Section) and convert it to common output format
 *  (CommonOutput).
 */
@Service
public class EducationServiceImpl implements EducationService {

    Logger logger= LoggerFactory.getLogger(EducationServiceImpl.class);

    /*
     *  Used to process input and return in common output
     *  format.
     */

    @Autowired
    private CommonOutput commonOutput;

    @Autowired
    private IndexResource indexResource;

    private TargetProperty[] targetProperties;

    private Property[] properties;
    @Override
    public void processEducationDetails(Section section) {

        // System.out.println("Education"+section.toString());

        logger.info("education "+section.toString());
        properties = new Property[2];
        targetProperties = new TargetProperty[2];
        commonOutput.setOperationType(section.getOperationType());
        commonOutput.setSourceNode(section.getUserId());
        commonOutput.setSourceNodeProperty(null);
        commonOutput.setTargetNode("education");
        commonOutput.setRelationships("qualified_from");
        for(int i=0;i<section.getChicklets().length;i++)
        {
            TargetProperty targetProperty1=TargetProperty.builder().name(section.getChicklets()[i]
                    .getInstitution().getInstitutionName()).build();
            TargetProperty targetProperty2=TargetProperty.builder().name(section.getChicklets()[i]
                    .getQualification().getTitle()).build();
            targetProperties[0]=targetProperty1;
            targetProperties[1]=targetProperty2;
            Property property1=Property.builder().propertyName("from").
                    propertyValue(section.getChicklets()[i].getInstitution().getStartDate()).build();
            Property property2=Property.builder().propertyName("to").
                    propertyValue(section.getChicklets()[i].getInstitution().getEndDate()).build();
            properties[0]=property1;
            properties[1]=property2;
            commonOutput.setTargetNodeProperty(targetProperties);
            commonOutput.setProperties(properties);
            indexResource.postData(commonOutput);
        }

    }
}
