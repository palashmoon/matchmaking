package com.example.community.controller;

import com.example.community.domain.Interest;
import com.example.community.domain.Location;
import com.example.community.domain.User;
import com.example.community.service.*;
import org.neo4j.driver.v1.Driver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CommunityController {
    LocationService locationService;
    InterestService interestService;
    UserService userService;
    QueryService queryService;
    private DriverInit driver = new DriverInit("bolt://172.23.239.111");
    @Autowired
    public CommunityController(LocationService locationService, InterestService interestService,UserService userService,QueryService queryService) {
        this.locationService = locationService;
        this.interestService =  interestService;
        this.userService = userService;
        this.queryService = queryService;

    }
    @GetMapping("/location")
    public List<Location> getAlllocation(){
        //return locationService.getAlllocation();
        List<Location> locationsCollection = locationService.getAlllocation();
        return locationsCollection;
    }
    @GetMapping("/interest")
    public List<Interest> getAllinterest(){
        System.out.println(interestService.getAllInterest());
        List<Interest> InterestCollection = interestService.getAllInterest();
        return InterestCollection;
    }
    @GetMapping("/user")
    public List<User> getAlluser(){
        //System.out.println(UserService.getAllUser());
        List<User> UserCollection = userService.getAllUser();
        return UserCollection;
    }
    @GetMapping("/community")
    public void getALlcommunity()
    {
        Driver drive = driver.getDriver();
        queryService.runquery(drive);
//        drive.close();

    }
}
