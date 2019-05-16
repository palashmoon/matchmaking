package com.stackroute.cacheservice.config;

import com.stackroute.cacheservice.RedisDomain.*;
import com.stackroute.cacheservice.RedisRepository.SkillsRepository;
import com.stackroute.cacheservice.RedisService.*;
import com.stackroute.cacheservice.domain.*;
import com.stackroute.cacheservice.repository.EducationRepository;
import com.stackroute.cacheservice.repository.LocationRepository;
import com.stackroute.cacheservice.repository.OrganizationRepository;
import com.stackroute.cacheservice.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class PreloadData implements  CommandLineRunner {

    private EducationRepository educationRepository;
    private LocationRepository locationRepository;
    private SkillsRepository skillsRepository;
    private OrganizationRepository organizationRepository;
    private LocationService locationService;
    private SkillService skillService;
    private EducationService educationService;
    private EducService educService;
    private ExpService expService;
    private LocService locService;
    private SkillServices skillServices;
    private DomainService domainService;
    private OrganizationService organizationService;
    private QualificationService qualificationService;
    private DomainServices domainServices;
    private OrgService orgService;

    @Autowired
    public PreloadData(EducationRepository educationRepository,
                       SkillService skillService,
                       LocationRepository locationRepository,
                       SkillsRepository skillsRepository,
                       DomainService domainService, OrganizationRepository organizationRepository,
                       EducService educService ,
                       ExpService expService,
                       LocationService locationService,
                       EducationService educationService,
                       LocService locService ,
                       SkillServices skillServices,
                       OrganizationService organizationService,
                       QualificationService qualificationService,
                       DomainServices domainServices,
                       OrgService orgService)
    {
        this.educationRepository=educationRepository;
        this.locationRepository=locationRepository;
        this.organizationRepository=organizationRepository;
        this.skillsRepository=skillsRepository;
        this.skillService = skillService;
        this.locationService = locationService;
        this.domainService = domainService;
        this.educationService = educationService;
        this.educService = educService;
        this.organizationService = organizationService;
        this.expService = expService;
        this.locService = locService;
        this.skillServices = skillServices;
        this.qualificationService = qualificationService;
        this.domainServices = domainServices;
        this.orgService = orgService;

    }

    @Override
    public void run(String... args) throws Exception {

        List<Domain> domainCollection = domainService.getAllDomain();
        for(int i = 0 ; i< domainCollection.size() ; i++){
            RedisDomain redisDomain = new RedisDomain();
            Domain domain1 = domainCollection.get(i);
            redisDomain.setId(domain1.getId());
            redisDomain.setName(domain1.getName());
            domainServices.saveDomain(redisDomain);
        }


        List<Organization> organizationCollection = organizationService.getAllOrganization();
        for(int i=0;i<organizationCollection.size();i++){
            RedisOrganization redisOrganization = new RedisOrganization();
            Organization organization1 = organizationCollection.get(i);
            redisOrganization.setId(organization1.getId());
            redisOrganization.setName(organization1.getName());
            orgService.saveOrganization(redisOrganization);
        }

        List<Location> locationsCollection = locationService.getAlllocation();
        for(int i = 0 ; i< locationsCollection.size() ; i++){
            RedisLocation redisLocation = new RedisLocation();
            Location location1 = locationsCollection.get(i);
            redisLocation.setId(location1.getId());
            redisLocation.setName(location1.getName());
            locService.saveLocation(redisLocation);
        }

        List<Skill>skillCollection = skillService.getAllSkills();
        for(int i = 0 ; i<skillCollection.size() ; i++){
            RedisSkill redisSkill = new RedisSkill();
            Skill skill1 = skillCollection.get(i);
            redisSkill.setId(skill1.getId());
            redisSkill.setName(skill1.getName());
            skillServices.saveSkill(redisSkill);
        }

        List<Education> educationsCollection = educationService.getAlleducation();
        for(int i = 0; i<educationsCollection.size();i++ ){
            RedisEducation redisEducation=new RedisEducation();
            Education education1=educationsCollection.get(i);
            redisEducation.setId(education1.getId());
            redisEducation.setName(education1.getName());
            educService.saveEducation(redisEducation);
        }

        List<Education> qualificationCollection = educationService.getAllQualification();
        for(int i = 0; i<qualificationCollection.size();i++ ){
            RedisQualification redisQualification=new RedisQualification();
            Education education1=qualificationCollection.get(i);
            redisQualification.setId(education1.getId());
            redisQualification.setName(education1.getName());
            qualificationService.saveQualification(redisQualification);
        }
    }
//    @Override
//    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
//
//    }
}
