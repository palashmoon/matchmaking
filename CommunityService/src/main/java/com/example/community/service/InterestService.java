package com.example.community.service;

import com.example.community.domain.Interest;
import com.example.community.repository.InterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterestService {
    InterestRepository interestRepository;
    @Autowired
    public InterestService(InterestRepository interestRepository){
        this.interestRepository = interestRepository;
    }
    public List<Interest> getAllInterest(){
        System.out.println("hjsdjskdjskdjsk" + interestRepository.getAllInterest());
        return interestRepository.getAllInterest();
    }

}
