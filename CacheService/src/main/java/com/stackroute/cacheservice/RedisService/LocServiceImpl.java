package com.stackroute.cacheservice.RedisService;

import com.stackroute.cacheservice.RedisDomain.RedisLocation;
import com.stackroute.cacheservice.RedisRepository.LocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocServiceImpl implements LocService {


    LocRepository locRepository;

    @Autowired
    public LocServiceImpl(LocRepository locRepository){
        this.locRepository = locRepository;
    }

    @Override
    public RedisLocation saveLocation(RedisLocation location){
        RedisLocation location1 = locRepository.save(location);
        return location1;
    }

    @Override
    public List<RedisLocation> getAllRedisLocation(){
        return (List<RedisLocation>) locRepository.findAll();
    }

    @Override
    public List<RedisLocation> cityAutoComplete(String term){
        return (List<RedisLocation>) locRepository.findAll();
    }
}
