package com.stackroute.cacheservice.service;

import com.stackroute.cacheservice.domain.Domain;
import com.stackroute.cacheservice.repository.DomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DomainService {

    DomainRepository domainRepository;

    @Autowired
    public DomainService(DomainRepository domainRepository){
        this.domainRepository = domainRepository;
    }

    public List<Domain> getAllDomain(){
        return domainRepository.getAllDomain();
    }
}
