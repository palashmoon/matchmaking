package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisLocation;
import com.stackroute.cacheservice.RedisDomain.RedisOrganization;
import com.stackroute.cacheservice.RedisRepository.OrgRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrgServiceImpl implements OrgService {

    OrgRepository orgRepository;

    @Autowired
    public OrgServiceImpl(OrgRepository orgRepository){
        this.orgRepository = orgRepository;
    }

    @Override
    public RedisOrganization saveOrganization(RedisOrganization organization){
        RedisOrganization organization1 = orgRepository.save(organization);
        return organization1;
    }
    @Override
    public List<RedisOrganization> getAllRedisOrganization(){
        return (List<RedisOrganization>) orgRepository.findAll();
    }

    @Override
    public List<RedisOrganization> searchOrganizations(String term){
        return (List<RedisOrganization>) orgRepository.findAll();
    }
}
