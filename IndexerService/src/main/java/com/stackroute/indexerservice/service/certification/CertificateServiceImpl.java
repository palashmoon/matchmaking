package com.stackroute.indexerservice.service.certification;


import com.stackroute.indexerservice.domain.Organization;
import com.stackroute.indexerservice.domain.User;
import com.stackroute.indexerservice.domain.input.CommonOutput;
import com.stackroute.indexerservice.domain.input.Property;
import com.stackroute.indexerservice.domain.relationships.CertificateRelationshipProperty;
import com.stackroute.indexerservice.repository.CertifiedRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CertificateServiceImpl implements CertificateService{
    @Autowired
    private CertifiedRepository certifiedRepository;
    @Autowired
    private User user;
    @Autowired
    private Organization organization;
    private Map<String,String> prop;
    private String key;
    private String value;
    private Property[] property;
    public CertificateServiceImpl(){
        prop = new HashMap<>();
    }
    Logger logger = LoggerFactory.getLogger(CertificateServiceImpl.class);


    public void createNode(CommonOutput commonOutput) {
        user.setUserId(commonOutput.getSourceNode());
        logger.info("-------------In Certification Service Node Creation--------------------");

            organization.setName(commonOutput.getTargetNodeProperty()[0].getName());
            CertificateRelationshipProperty certificateRelationshipProperty= new CertificateRelationshipProperty();
            certificateRelationshipProperty.setRelationship(commonOutput.getRelationships());
            certificateRelationshipProperty.setUser(user);
            certificateRelationshipProperty.setOrganization(organization);
            property = commonOutput.getProperties();
            for (int j = 0; j < property.length; j++) {
                key = property[j].getPropertyName();
                value = property[j].getPropertyValue();
                prop.put(key, value);
            }
            certificateRelationshipProperty.setProperties(prop);
            certifiedRepository.save(certificateRelationshipProperty);
            logger.info("-------------In Certification Service Node Created--------------------");

    }

    public void deleteNode(CommonOutput commonOutput){
        logger.info("-------------In Certification Service Node Deleted--------------------");
        user.setUserId(commonOutput.getSourceNode());
        organization.setName(commonOutput.getTargetNodeProperty()[0].getName());
        certifiedRepository.deleteNode(user.getUserId(),organization.getName());
        logger.info("-------------In Certification Service Node Deleted--------------------");
    }

    public void updateNode(CommonOutput commonOutput) {
        logger.info("-------------In Certification Service Node Updating--------------------");
        user.setUserId(commonOutput.getSourceNode());
        for (int i = 0; i < commonOutput.getTargetNodeProperty().length; i++)
        {
            organization.setName(commonOutput.getTargetNodeProperty()[i].getName());
            CertificateRelationshipProperty certificateRelationshipProperty= new CertificateRelationshipProperty();
            certificateRelationshipProperty.setRelationship(commonOutput.getRelationships());
            certificateRelationshipProperty.setUser(user);
            certificateRelationshipProperty.setOrganization(organization);
            property = commonOutput.getProperties();
            for (int j = 0; j < property.length; j++) {
                key = property[j].getPropertyName();
                value = property[j].getPropertyValue();
                prop.put(key, value);
            }
            certificateRelationshipProperty.setProperties(prop);
            certifiedRepository.save(certificateRelationshipProperty);
        }
        logger.info("-------------In Certification Service Node Updated--------------------");
    }

}
