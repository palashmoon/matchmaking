package com.stackroute.experienceservice.service;

import com.stackroute.experienceservice.domain.CommonOutput;
import com.stackroute.experienceservice.domain.Property;
import com.stackroute.experienceservice.domain.Section;
import com.stackroute.experienceservice.domain.TargetProperty;
import com.stackroute.experienceservice.resource.IndexResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExperienceServiceImpl implements ExperienceService{
    @Autowired
    private CommonOutput commonOutput;
    @Autowired
    private IndexResource indexResource;
    @Autowired
    private TargetProperty[] targetProperties;

    public void  processExperienceDetails(Section section){
        Property[] properties = new Property[3];
        commonOutput.setOperationType(section.getOperationType());
        commonOutput.setSourceNode(section.getUserId());
        commonOutput.setSourceNodeProperty(null);
        commonOutput.setTargetNode("organization");
        commonOutput.setRelationships("works_in");
        String date;
        for(int i=0;i<section.getChicklets().length;i++)
        {
            targetProperties[0].setName(section.getChicklets()[i].getExperienceDetails().getOrganisation());
            date = section.getChicklets()[i].getExperienceDetails().getFromDate()+  " " +
                    section.getChicklets()[i].getExperienceDetails().getFromMonth()+ " " +
                    section.getChicklets()[i].getExperienceDetails().getFromYear();
            Property property1 = Property.builder().propertyName("from").propertyValue(date).build();
            properties[0]=property1;
            date=section.getChicklets()[i].getExperienceDetails().getToDate()+ " " +
                    section.getChicklets()[i].getExperienceDetails().getToMonth()+ " " +
                    section.getChicklets()[i].getExperienceDetails().getToYear();
            Property property2 = Property.builder().propertyName("to").propertyValue(date).build();
            properties[1]=property2;
            Property property3 = Property.builder().propertyName("role").propertyValue(section.getChicklets()[i]
                    .getExperienceDetails().getRole()).build();
            properties[2]=property3;
            commonOutput.setTargetNodeProperty(targetProperties);
            commonOutput.setProperties(properties);
            indexResource.postDate(commonOutput);
        }
    }
}
