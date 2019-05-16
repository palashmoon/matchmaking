package com.stackroute.cacheservice.service;

import com.stackroute.cacheservice.domain.Skill;
import com.stackroute.cacheservice.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    SkillRepository skillRepository;

    @Autowired
    public SkillService(SkillRepository skillRepository){
        this.skillRepository = skillRepository;
    }

    public List<Skill> getAllSkills(){
        System.out.println("srk"+ skillRepository.getAllSkills());
        return skillRepository.getAllSkills();
    }
}
