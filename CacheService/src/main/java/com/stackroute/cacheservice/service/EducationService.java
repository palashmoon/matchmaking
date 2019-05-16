package com.stackroute.cacheservice.service;

import com.stackroute.cacheservice.domain.Education;
import com.stackroute.cacheservice.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class EducationService {

    EducationRepository educationRepository;
    @Autowired
    public EducationService( EducationRepository educationRepository){
        this.educationRepository=educationRepository;
    }


    public List<Education> getAlleducation(){
        //System.out.println("hjsdjskdjskdjsk" + educationRepository.getAllEducation());
        return educationRepository.getAllEducation();
    }

    public List<Education> getAllQualification(){
        return educationRepository.getAllQualification();
    }
}
