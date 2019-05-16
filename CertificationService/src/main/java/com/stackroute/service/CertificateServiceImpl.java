package com.stackroute.service;

import com.stackroute.domain.*;
import com.stackroute.resource.IndexResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/*This service is used
to create the common output that will be send
to indexer kafka topic in this class we filter
the content from the front end and create a
object for indexing data to the graphdb*/
@Service
public class CertificateServiceImpl implements CertificateService{
    Logger logger= LoggerFactory.getLogger(CertificateServiceImpl.class);
    @Autowired
    private CommonOutput commonOutput;
    @Autowired
    private IndexResource indexResource;
    @Autowired
    private TargetProperty[] targetProperties;


    public void processCertificateDetails(Section section) {
        Property[] properties = new Property[2] ;
        logger.info("certificate"+section.toString());
        commonOutput.setOperationType(section.getOperationType());
        commonOutput.setSourceNode(section.getUserId());
        commonOutput.setSourceNodeProperty(null);
        commonOutput.setRelationships("certified_in");
        commonOutput.setTargetNode("certificate");
        for(int i=0;i<section.getChicklets().length;i++)
        {
            targetProperties[0].setName(section.getChicklets()[i].getCertificateDetails().getCertificateName());

            Property property1=Property.builder().propertyName("from").
                    propertyValue(section.getChicklets()[i].getCertificateDetails().getFromDate())
                    .build();
            Property property2=Property.builder().propertyName("to").
                propertyValue(section.getChicklets()[i].getCertificateDetails().getToDate())
                .build();
            properties[0]=property1;
            properties[1]=property2;
            commonOutput.setTargetNodeProperty(targetProperties);
            commonOutput.setProperties(properties);
            indexResource.postData(commonOutput);
        }
    }
}
