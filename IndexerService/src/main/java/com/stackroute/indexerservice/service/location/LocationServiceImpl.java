package com.stackroute.indexerservice.service.location;


import com.stackroute.indexerservice.domain.Location;
import com.stackroute.indexerservice.domain.User;
import com.stackroute.indexerservice.domain.input.CommonOutput;
import com.stackroute.indexerservice.domain.input.Property;
import com.stackroute.indexerservice.domain.relationships.LocationRelationshipProperty;
import com.stackroute.indexerservice.repository.LivesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LocationServiceImpl implements LocationService {
    @Autowired
    private LivesRepository livesRepository;
    private User user;
    @Autowired
    private Location location;
    Logger logger = LoggerFactory.getLogger(LocationServiceImpl.class);

    public void createNode(CommonOutput commonOutput) {
        logger.info("-------------In Location Service Node Creating--------------------");
        user=new User(commonOutput.getSourceNode());

        //System.out.println("size "+ commonOutput.getTargetNodeProperty().length);

            location.setName(commonOutput.getTargetNodeProperty()[0].getName());
            LocationRelationshipProperty locationRelationshipProperty = new LocationRelationshipProperty();
            locationRelationshipProperty.setRelationship(commonOutput.getRelationships());
            locationRelationshipProperty.setUser(user);
            locationRelationshipProperty.setLocation(location);
            livesRepository.save(locationRelationshipProperty);
        logger.info("-------------In Location Service Node Created--------------------");

    }

    public void deleteNode(CommonOutput commonOutput) {
        logger.info("-------------In Location Service Node Deleting--------------------");
        user.setUserId(commonOutput.getSourceNode());
        location.setName(commonOutput.getTargetNodeProperty()[0].getName());
        livesRepository.deleteNode(user.getUserId(),location.getName());
        logger.info("-------------In Location Service Node Deleted--------------------");

    }

    public void updateNode(CommonOutput commonOutput){
        logger.info("-------------In Location Service Node Updating--------------------");
        user.setUserId(commonOutput.getSourceNode());

            location.setName(commonOutput.getTargetNodeProperty()[0].getName());
            LocationRelationshipProperty locationRelationshipProperty = new LocationRelationshipProperty();
            locationRelationshipProperty.setRelationship(commonOutput.getRelationships());
            locationRelationshipProperty.setUser(user);
            locationRelationshipProperty.setLocation(location);
            livesRepository.save(locationRelationshipProperty);
        logger.info("-------------In Interest Service Node Updated--------------------");
    }


}
