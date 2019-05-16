package com.stackroute.indexerservice.service.projects;


import com.stackroute.indexerservice.domain.*;
import com.stackroute.indexerservice.domain.input.CommonOutput;
import com.stackroute.indexerservice.domain.input.Property;
import com.stackroute.indexerservice.domain.relationships.*;
import com.stackroute.indexerservice.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectByRepository projectByRepository;

    @Autowired
    private ProjectForRepository projectForRepository;

    @Autowired
    private InDomainRepository inDomainRepository;
    @Autowired
    private ProjectTechnologyRepository projectTechnologyRepository;

    @Autowired
    private User user;
    @Autowired
    private Project project;
    @Autowired
    private Domain domain;

    private Organization company;

    private Organization client;
    @Autowired
    private Skill skill;

    private Map<String,String> prop;
    private String key;
    private String value;
    private Property[] property;

    public ProjectServiceImpl(){
        prop = new HashMap<>();
    }
    Logger logger = LoggerFactory.getLogger(ProjectServiceImpl.class);
    public void createNode(CommonOutput commonOutput) {
        logger.info("-------------In Project Service Node Creating--------------------");
        company = new Organization();
        client = new Organization();
        ProjectRelationshipProperty projectRelationshipProperty = new ProjectRelationshipProperty();
        user.setUserId(commonOutput.getSourceNode());
        project.setName(commonOutput.getTargetNodeProperty()[0].getName());
        company.setName(commonOutput.getTargetNodeProperty()[1].getName());
        client.setName(commonOutput.getTargetNodeProperty()[2].getName());
        domain.setName(commonOutput.getTargetNodeProperty()[3].getName());
        property=commonOutput.getProperties();
        for(int i=0;i<property.length;i++)
        {
            key = property[i].getPropertyName();
            value = property[i].getPropertyValue();
            prop.put(key, value);
        }
        projectRelationshipProperty.setRelationship(commonOutput.getRelationships());
        projectRelationshipProperty.setProject(project);
        projectRelationshipProperty.setUser(user);
        projectRelationshipProperty.setProperties(prop);
        projectRepository.save(projectRelationshipProperty);
        projectRepository.saveNode(project.getName());


        ProjectCompanyRelationshipProperty projectCompanyRelationshipProperty = new ProjectCompanyRelationshipProperty();
        projectCompanyRelationshipProperty.setRelationship("project_by");
        projectCompanyRelationshipProperty.setOrganization(company);
        projectCompanyRelationshipProperty.setProject(project);
        projectByRepository.save(projectCompanyRelationshipProperty);

        ProjectClientRelationshipProperty projectClientRelationshipProperty = new ProjectClientRelationshipProperty();
        projectClientRelationshipProperty.setRelationship("project_for");
        projectClientRelationshipProperty.setProject(project);
        projectClientRelationshipProperty.setOrganization(client);
        projectForRepository.save(projectClientRelationshipProperty);

        ProjectDomainRelationshipProperty projectDomainRelationshipProperty = new ProjectDomainRelationshipProperty();
        projectDomainRelationshipProperty.setDomain(domain);
        projectDomainRelationshipProperty.setProject(project);
        projectDomainRelationshipProperty.setRelationship("in_the");
        inDomainRepository.save(projectDomainRelationshipProperty);

        TechnologyUsedRelationshipProperty technologyUsedRelationshipProperty = new TechnologyUsedRelationshipProperty();
        for(int j=4;j<commonOutput.getTargetNodeProperty().length;j++)
        {
            skill.setName(commonOutput.getTargetNodeProperty()[j].getName());
            technologyUsedRelationshipProperty.setSkill(skill);
            technologyUsedRelationshipProperty.setProject(project);
            technologyUsedRelationshipProperty.setRelationship("technology_used");
            projectTechnologyRepository.save(technologyUsedRelationshipProperty);
        }
        logger.info("-------------In Project Service Node Created--------------------");
    }

    public void deleteNode(CommonOutput commonOutput){
        logger.info("-------------In Project Service Node Deleting--------------------");
        user.setUserId(commonOutput.getSourceNode());
        project.setName(commonOutput.getTargetNodeProperty()[0].getName());
        projectRepository.deleteNode(user.getUserId(),project.getName());
        logger.info("-------------In Project Service Node Deleted--------------------");
    }

    public void updateNode(CommonOutput commonOutput){
        logger.info("-------------In Project Service Node Updating--------------------");
        company = new Organization();
        client = new Organization();
        ProjectRelationshipProperty projectRelationshipProperty = new ProjectRelationshipProperty();
        user.setUserId(commonOutput.getSourceNode());
        project.setName(commonOutput.getTargetNodeProperty()[0].getName());
        company.setName(commonOutput.getTargetNodeProperty()[1].getName());
        client.setName(commonOutput.getTargetNodeProperty()[2].getName());
        domain.setName(commonOutput.getTargetNodeProperty()[3].getName());
        property=commonOutput.getProperties();
        for(int i=0;i<property.length;i++)
        {
            key = property[i].getPropertyName();
            value = property[i].getPropertyValue();
            prop.put(key, value);
        }
        projectRelationshipProperty.setRelationship(commonOutput.getRelationships());
        projectRelationshipProperty.setProject(project);
        projectRelationshipProperty.setUser(user);
        projectRelationshipProperty.setProperties(prop);
        projectRepository.save(projectRelationshipProperty);

        ProjectCompanyRelationshipProperty projectCompanyRelationshipProperty = new ProjectCompanyRelationshipProperty();
        projectCompanyRelationshipProperty.setRelationship("project_by");
        projectCompanyRelationshipProperty.setOrganization(company);
        projectCompanyRelationshipProperty.setProject(project);
        projectByRepository.save(projectCompanyRelationshipProperty);

        ProjectClientRelationshipProperty projectClientRelationshipProperty = new ProjectClientRelationshipProperty();
        projectClientRelationshipProperty.setRelationship("project_for");
        projectClientRelationshipProperty.setProject(project);
        projectClientRelationshipProperty.setOrganization(client);
        projectForRepository.save(projectClientRelationshipProperty);

        ProjectDomainRelationshipProperty projectDomainRelationshipProperty = new ProjectDomainRelationshipProperty();
        projectDomainRelationshipProperty.setDomain(domain);
        projectDomainRelationshipProperty.setProject(project);
        projectDomainRelationshipProperty.setRelationship("in_the");
        inDomainRepository.save(projectDomainRelationshipProperty);

        TechnologyUsedRelationshipProperty technologyUsedRelationshipProperty = new TechnologyUsedRelationshipProperty();
        for(int j=4;j<commonOutput.getTargetNodeProperty().length;j++)
        {
            skill.setName(commonOutput.getTargetNodeProperty()[j].getName());
            technologyUsedRelationshipProperty.setSkill(skill);
            technologyUsedRelationshipProperty.setProject(project);
            technologyUsedRelationshipProperty.setRelationship("technology_used");
            projectTechnologyRepository.save(technologyUsedRelationshipProperty);
        }
        logger.info("-------------In Project Service Node Updated--------------------");
    }
}
