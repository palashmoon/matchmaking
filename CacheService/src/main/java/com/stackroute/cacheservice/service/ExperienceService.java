package com.stackroute.cacheservice.service;


import com.stackroute.cacheservice.domain.Experience;

import com.stackroute.cacheservice.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {


    ExperienceRepository experienceRepository;
    @Autowired
    public ExperienceService (ExperienceRepository experienceRepository){
        this.experienceRepository=experienceRepository;
    }

    public List<Experience> getAllExperience(){
        System.out.println("hjsdjskdjskdjsk" + experienceRepository.getAllExperience());
        return experienceRepository.getAllExperience();
    }
}
