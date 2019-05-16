package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisDomain;
import com.stackroute.cacheservice.RedisRepository.DomainRepositorys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DomainServiceImpl implements DomainServices {

    DomainRepositorys domainRepositorys;

    @Autowired
    public DomainServiceImpl(DomainRepositorys domainRepositorys){
        this.domainRepositorys = domainRepositorys;
    }

    @Override
    public RedisDomain saveDomain(RedisDomain domain){
        RedisDomain domain1 = domainRepositorys.save(domain);
        return domain1;
    }

    @Override
    public List<RedisDomain> getAllRedisDomain(){
        return (List<RedisDomain>) domainRepositorys.findAll();
    }

    @Override
    public List<RedisDomain> searchDomain(String term){
        return (List<RedisDomain>) domainRepositorys.findAll();
    }
}
