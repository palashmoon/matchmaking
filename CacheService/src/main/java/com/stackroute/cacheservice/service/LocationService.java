package com.stackroute.cacheservice.service;

import com.stackroute.cacheservice.domain.Location;
import com.stackroute.cacheservice.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    LocationRepository locationRepository;
    @Autowired
    public LocationService(LocationRepository locationRepository)
    {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAlllocation(){
        System.out.println("hjsdjskdjskdjsk" + locationRepository.getAllLocation());
        return locationRepository.getAllLocation();
    }
}
