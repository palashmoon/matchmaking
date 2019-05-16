package com.stackroute.indexerservice.service.skill;

import com.stackroute.indexerservice.domain.Skill;
import com.stackroute.indexerservice.domain.User;
import com.stackroute.indexerservice.domain.input.CommonOutput;
import com.stackroute.indexerservice.domain.input.Property;
import com.stackroute.indexerservice.domain.relationships.SkillRelationshipProperty;
import com.stackroute.indexerservice.repository.SkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SkillServiceImpl implements SkillService {
    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private User user;
    @Autowired
    private Skill skill;
    private Map<String,String> prop;
    private String key;
    private String value;
    private Property[] property;

    public SkillServiceImpl(){
        prop = new HashMap<>();
    }
    Logger logger = LoggerFactory.getLogger(SkillServiceImpl.class);
    public void createNode(CommonOutput commonOutput) {
        logger.info("-------------In Skill Service Node Creating--------------------");
        user.setUserId(commonOutput.getSourceNode());
        for (int i = 0; i < commonOutput.getTargetNodeProperty().length; i++) {
            skill.setName(commonOutput.getTargetNodeProperty()[i].getName());
            SkillRelationshipProperty skillRelationshipProperty = new SkillRelationshipProperty();
            skillRelationshipProperty.setRelationship(commonOutput.getRelationships());
            skillRelationshipProperty.setUser(user);
            skillRelationshipProperty.setSkill(skill);
            property = commonOutput.getProperties();
            for (int j = 0; j< property.length; j++) {
                key = property[j].getPropertyName();
                value = property[j].getPropertyValue();
                prop.put(key, value);
            }
            skillRelationshipProperty.setProperties(prop);
            skillRepository.save(skillRelationshipProperty);
        }
        logger.info("-------------In Skill Service Node Created--------------------");
    }

    public void deleteNode(CommonOutput commonOutput) {
        logger.info("-------------In Skill Service Node Deleting--------------------");
        user.setUserId(commonOutput.getSourceNode());
        for (int i = 0; i < commonOutput.getTargetNodeProperty().length; i++) {
            skill.setName(commonOutput.getTargetNodeProperty()[i].getName());
            skillRepository.deleteNode(user.getUserId(),skill.getName());
        }
        logger.info("-------------In Skill Service Node Deleted--------------------");
    }

    public void updateNode(CommonOutput commonOutput)
    {
        logger.info("-------------In Skill Service Node Updating--------------------");
        user.setUserId(commonOutput.getSourceNode());
        for (int i = 0; i < commonOutput.getTargetNodeProperty().length; i++) {
            skill.setName(commonOutput.getTargetNodeProperty()[i].getName());
            SkillRelationshipProperty skillRelationshipProperty = new SkillRelationshipProperty();
            skillRelationshipProperty.setRelationship(commonOutput.getRelationships());
            skillRelationshipProperty.setUser(user);
            skillRelationshipProperty.setSkill(skill);
            property = commonOutput.getProperties();
            for (int j = 0; j < property.length; j++) {
                key = property[j].getPropertyName();
                value = property[j].getPropertyValue();
                prop.put(key, value);
            }
            skillRelationshipProperty.setProperties(prop);
            skillRepository.save(skillRelationshipProperty);
        }
        logger.info("-------------In Skill Service Node Updated--------------------");
    }
}
