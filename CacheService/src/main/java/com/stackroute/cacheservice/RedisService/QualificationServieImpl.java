package com.stackroute.cacheservice.RedisService;


import com.stackroute.cacheservice.RedisDomain.RedisQualification;

import com.stackroute.cacheservice.RedisRepository.QualificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QualificationServieImpl implements QualificationService{

    private QualificationRepository qualificationRepository;

    @Autowired
    public QualificationServieImpl(QualificationRepository qualificationRepository){
        this.qualificationRepository = qualificationRepository;
    }

    @Override
    public RedisQualification saveQualification(RedisQualification qualification){
        RedisQualification redisQualification1 = qualificationRepository.save(qualification);
        return redisQualification1;
    }

    @Override
    public List<RedisQualification> getAllRedisQualification(){
        return (List<RedisQualification>) qualificationRepository.findAll();
    }

    @Override
    public List<RedisQualification> searchQualification(){
        return (List<RedisQualification>) qualificationRepository.findAll();
    }
}
