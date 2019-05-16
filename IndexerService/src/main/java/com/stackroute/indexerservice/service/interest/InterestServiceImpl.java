package com.stackroute.indexerservice.service.interest;

import com.stackroute.indexerservice.domain.Interest;
import com.stackroute.indexerservice.domain.Organization;
import com.stackroute.indexerservice.domain.User;
import com.stackroute.indexerservice.domain.input.CommonOutput;
import com.stackroute.indexerservice.domain.input.Property;
import com.stackroute.indexerservice.domain.relationships.InterestRelationshipProperty;
import com.stackroute.indexerservice.repository.InterestRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class InterestServiceImpl implements InterestService {

    @Autowired
    private InterestRepository interestRepository;
    @Autowired
    private User user;
    @Autowired
    private Interest interest;

    Logger logger = LoggerFactory.getLogger(InterestServiceImpl.class);
    public void createNode(CommonOutput commonOutput){
        logger.info("-------------In Interest Service Node Created--------------------");
        user.setUserId(commonOutput.getSourceNode());
        for(int i=0;i<commonOutput.getTargetNodeProperty().length;i++){
            interest.setName(commonOutput.getTargetNodeProperty()[i].getName());
            InterestRelationshipProperty interestRelationshipProperty = new InterestRelationshipProperty();
            interestRelationshipProperty.setRelationship(commonOutput.getRelationships());
            interestRelationshipProperty.setUser(user);
            interestRelationshipProperty.setInterest(interest);
            interestRepository.save(interestRelationshipProperty);
        }
        logger.info("-------------In Interest Service Node Created--------------------");
    }

    public void deleteNode(CommonOutput commonOutput){
        logger.info("-------------In Interest Service Node Deleting--------------------");
        user.setUserId(commonOutput.getSourceNode());
        for(int i=0;i<commonOutput.getTargetNodeProperty().length;i++){
            interest.setName(commonOutput.getTargetNodeProperty()[i].getName());
            interestRepository.deleteNode(user.getUserId(),interest.getName());
        }
        logger.info("-------------In Interest Service Node Deleted--------------------");
    }
    public void updateNode(CommonOutput commonOutput){
        logger.info("-------------In Interest Service Node Updating--------------------");
        user.setUserId(commonOutput.getSourceNode());
        for(int i=0;i<commonOutput.getTargetNodeProperty().length;i++){
            interest.setName(commonOutput.getTargetNodeProperty()[i].getName());
            InterestRelationshipProperty interestRelationshipProperty = new InterestRelationshipProperty();
            interestRelationshipProperty.setRelationship(commonOutput.getRelationships());
            interestRelationshipProperty.setUser(user);
            interestRelationshipProperty.setInterest(interest);
            interestRepository.save(interestRelationshipProperty);
        }
        logger.info("-------------In Interest Service Node Updated--------------------");
    }
}
