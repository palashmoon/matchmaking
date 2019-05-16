package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisSkill;
import com.stackroute.cacheservice.RedisRepository.SkillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillServiceImpl implements SkillServices {

    SkillsRepository skillsRepository;

    @Autowired
    public SkillServiceImpl(SkillsRepository skillsRepository){
        this.skillsRepository = skillsRepository;
    }

    @Override
    public RedisSkill saveSkill(RedisSkill skill){
        RedisSkill skill1 = skillsRepository.save(skill);
        return skill1;
    }

    @Override
    public List<RedisSkill> getAllRedisSkill(){
        return (List<RedisSkill>) skillsRepository.findAll();
    }

    @Override
    public List<RedisSkill> searchSkill(String term){
        return (List<RedisSkill>) skillsRepository.findAll();
    }
}
