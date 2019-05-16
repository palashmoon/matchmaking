package com.stackroute.indexerservice.service.experience;

import com.stackroute.indexerservice.domain.Organization;
import com.stackroute.indexerservice.domain.User;
import com.stackroute.indexerservice.domain.input.CommonOutput;
import com.stackroute.indexerservice.domain.input.Property;
import com.stackroute.indexerservice.domain.relationships.ExperienceRelationshipProperty;
import com.stackroute.indexerservice.repository.WorksRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ExperienceServiceImpl  implements  ExperienceService{
    @Autowired
    private WorksRepository worksRepository;
    @Autowired
    private User user;
    @Autowired
    private Organization organization;
    private Map<String,String> prop;
    private String key;
    private String value;
    private Property[] property;
    public ExperienceServiceImpl(){

        prop = new HashMap<>();

    }
    Logger logger = LoggerFactory.getLogger(ExperienceServiceImpl.class);

    public void createNode(CommonOutput commonOutput) {
        logger.info("-------------In Experience Service Node Creation--------------------");
        user.setUserId(commonOutput.getSourceNode());

            organization.setName(commonOutput.getTargetNodeProperty()[0].getName());
            ExperienceRelationshipProperty experienceRelationshipProperty = new ExperienceRelationshipProperty();
            experienceRelationshipProperty.setRelationship(commonOutput.getRelationships());
            experienceRelationshipProperty.setUser(user);
            experienceRelationshipProperty.setOrganization(organization);
            property = commonOutput.getProperties();
            for (int j = 0; j < property.length; j++) {
                key = property[j].getPropertyName();
                value = property[j].getPropertyValue();
                prop.put(key, value);
            }

            String fromDate=prop.get("from");
            String[] splitFrom= fromDate.split(" ");
            int fromYear=Integer.parseInt(splitFrom[2]);


            String toDate=prop.get("to");
            String[] splitTo=toDate.split(" ");
            int toYear = Integer.parseInt(splitTo[2]);

            int duration=toYear-fromYear;
            String durationYear=Integer.toString(duration);

            key="duration";
            value=durationYear + " year";
            prop.put(key,value);
            experienceRelationshipProperty.setDuration(value);
            worksRepository.save(experienceRelationshipProperty);
        logger.info("-------------In Experience Service Node Created--------------------");
    }
    public void deleteNode(CommonOutput commonOutput){
        logger.info("-------------In Experience Service Node Deleting--------------------");
        user.setUserId(commonOutput.getSourceNode());
        for (int i = 0; i < commonOutput.getTargetNodeProperty().length; i++) {
            organization.setName(commonOutput.getTargetNodeProperty()[i].getName());
            worksRepository.deleteNode(user.getUserId(),organization.getName());
        }
        logger.info("-------------In Experience Service Node Deleted--------------------");
    }

    public  void updateNode(CommonOutput commonOutput){
        logger.info("-------------In Experience Service Node Updating--------------------");
        user.setUserId(commonOutput.getSourceNode());
            organization.setName(commonOutput.getTargetNodeProperty()[0].getName());
            ExperienceRelationshipProperty experienceRelationshipProperty = new ExperienceRelationshipProperty();
            experienceRelationshipProperty.setRelationship(commonOutput.getRelationships());
            experienceRelationshipProperty.setUser(user);
            experienceRelationshipProperty.setOrganization(organization);
            property = commonOutput.getProperties();
            for (int j = 0; j < property.length; j++) {
                key = property[j].getPropertyName();
                value = property[j].getPropertyValue();
                prop.put(key, value);
            }
            String fromDate=prop.get("from");
            String[] splitFrom= fromDate.split(" ");
            int fromYear=Integer.parseInt(splitFrom[2]);

            String toDate=prop.get("to");
            String[] splitTo=toDate.split(" ");
            int toYear = Integer.parseInt(splitTo[2]);

            int duration=toYear-fromYear;
            String durationYear=Integer.toString(duration);

            key="duration";
            value=durationYear + " year";
            prop.put(key,value);
            experienceRelationshipProperty.setDuration(value);
            worksRepository.save(experienceRelationshipProperty);
        logger.info("-------------In Experience Service Node Updated--------------------");
    }
}
