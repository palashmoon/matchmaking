package com.stackroute.cacheservice.service;


import com.stackroute.cacheservice.domain.Domain;
import com.stackroute.cacheservice.domain.Organization;
import com.stackroute.cacheservice.repository.DomainRepository;
import com.stackroute.cacheservice.repository.OrganizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationService {
    OrganizationRepository organizationRepository;

    @Autowired
    public OrganizationService(OrganizationRepository organizationRepository){
        this.organizationRepository = organizationRepository;
    }

    public List<Organization> getAllOrganization(){
        return organizationRepository.getAllOrganization();
    }
}
