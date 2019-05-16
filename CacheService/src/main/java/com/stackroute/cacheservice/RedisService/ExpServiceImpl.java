package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisExperience;
import com.stackroute.cacheservice.RedisRepository.ExpRepository;
import com.stackroute.cacheservice.domain.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpServiceImpl implements ExpService {
    ExpRepository expRepository;

    @Autowired
    public ExpServiceImpl(ExpRepository expRepository){
        this.expRepository = expRepository;
    }

    @Override
    public RedisExperience saveExperience(RedisExperience experience){
        RedisExperience experience1 = expRepository.save(experience);
        return experience1;
    }

    @Override
    public List<RedisExperience> getAllRedisExperience(){
        return (List<RedisExperience>) expRepository.findAll();
    }

    @Override
    public List<RedisExperience> searchOrganization(String term){
        return (List<RedisExperience>) expRepository.findAll();
    }
}
