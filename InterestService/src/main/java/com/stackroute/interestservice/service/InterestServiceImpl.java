package com.stackroute.interestservice.service;

import com.stackroute.interestservice.domain.CommonOutput;
import com.stackroute.interestservice.domain.Section;
import com.stackroute.interestservice.resource.IndexResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InterestServiceImpl implements InterestService {
    private CommonOutput commonOutput = new CommonOutput();
    private IndexResource indexResource;

    Logger logger= LoggerFactory.getLogger(InterestServiceImpl.class);

    @Autowired
    public InterestServiceImpl(IndexResource indexResource){
        this.indexResource = indexResource;
    }

    @Override
    public void processInterestDetails(Section section){

        String query = section.getChicklets()[0].getInterest();

        commonOutput.setOperationType(section.getOperationType().toLowerCase());
        commonOutput.setSourceNode(section.getUserId().toLowerCase());
        commonOutput.setSourceNodeProperty(null);
        commonOutput.setTargetNode(query);
        commonOutput.setTargetNodeProperty(null);
        commonOutput.setRelationships("interest_in");
        commonOutput.setProperties(null);

        logger.info(commonOutput.toString());

        indexResource.postData(commonOutput);
    }
}
