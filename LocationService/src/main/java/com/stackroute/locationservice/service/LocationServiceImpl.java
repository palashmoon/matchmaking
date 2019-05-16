package com.stackroute.locationservice.service;


import com.stackroute.locationservice.domain.CommonOutput;
import com.stackroute.locationservice.domain.Section;
import com.stackroute.locationservice.domain.TargetProperty;
import com.stackroute.locationservice.resource.IndexResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/* This service is used to create the common output that will be send
to 'indexer' kafka topic. Here we process
the data from front end and create an
object for indexing data to the graphdb (neo4j)*/
@Service
public class LocationServiceImpl implements LocationService{
    @Autowired
    private CommonOutput commonOutput;
    @Autowired
    private IndexResource indexResource;
    @Autowired
    private TargetProperty[] targetProperties;

    @Override
    public void processLocationDetails(Section section){
        commonOutput.setOperationType(section.getOperationType().toLowerCase());
        commonOutput.setSourceNode(section.getUserId().toLowerCase());
        commonOutput.setSourceNodeProperty(null);
        commonOutput.setTargetNode("location");
        commonOutput.setRelationships("lives_in");
        for(int i=0;i<section.getChicklets().length;i++)
        {
            targetProperties[0].setName(section.getChicklets()[i].getCurrentLocation().getCityName().toLowerCase());
            commonOutput.setTargetNodeProperty(targetProperties);
            indexResource.postData(commonOutput);
        }
    }

}
