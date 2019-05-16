package com.stackroute.indexerservice.service;

import com.stackroute.indexerservice.domain.input.CommonOutput;
import com.stackroute.indexerservice.service.certification.CertificateService;
import com.stackroute.indexerservice.service.education.EducationService;
import com.stackroute.indexerservice.service.experience.ExperienceService;
import com.stackroute.indexerservice.service.interest.InterestService;
import com.stackroute.indexerservice.service.location.LocationService;
import com.stackroute.indexerservice.service.projects.ProjectService;
import com.stackroute.indexerservice.service.skill.SkillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OntologyServiceImpl implements OntologyService {
    @Autowired
    private SkillService skillService;
    @Autowired
    private LocationService locationService;
    @Autowired
    private ExperienceService experienceService;
    @Autowired
    private EducationService educationService;
    @Autowired
    private CertificateService certificateService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private InterestService interestService;

    Logger logger = LoggerFactory.getLogger(OntologyService.class);
    public void createNode(CommonOutput commonOutput){

        if(commonOutput.getTargetNode().equals("skill")) {

            skillService.createNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("location")) {

            locationService.createNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("organization")) {

            experienceService.createNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("education")) {
            logger.info("------------------creating node of education--------------------");
            educationService.createNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("certificate")){

            certificateService.createNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("project")){

            projectService.createNode(commonOutput);
        } else if(commonOutput.getTargetNode().equals("interest")){

            interestService.createNode(commonOutput);
        }
    }

    public void deleteNode(CommonOutput commonOutput) {

        if (commonOutput.getTargetNode().equals("skill")) {

            skillService.deleteNode(commonOutput);

        } else if (commonOutput.getTargetNode().equals("location")) {

            locationService.deleteNode(commonOutput);

        } else if (commonOutput.getTargetNode().equals("organization")) {

            experienceService.deleteNode(commonOutput);

        } else if (commonOutput.getTargetNode().equals("education")) {

            educationService.deleteNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("certificate")){

            certificateService.deleteNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("project")){

            projectService.deleteNode(commonOutput);
        } else if(commonOutput.getTargetNode().equals("interest")){

            interestService.deleteNode(commonOutput);
        }
    }

    public void updateNode(CommonOutput commonOutput){
        if (commonOutput.getTargetNode().equals("skill")) {

            skillService.updateNode(commonOutput);

        } else if (commonOutput.getTargetNode().equals("location")) {

            locationService.updateNode(commonOutput);

        } else if (commonOutput.getTargetNode().equals("organization")) {

            experienceService.updateNode(commonOutput);

        } else if (commonOutput.getTargetNode().equals("education")) {

            educationService.updateNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("certificate")){

            certificateService.updateNode(commonOutput);

        } else if(commonOutput.getTargetNode().equals("project")){

            projectService.updateNode(commonOutput);
        } else if(commonOutput.getTargetNode().equals("interest")){

            interestService.updateNode(commonOutput);
        }
    }
}

