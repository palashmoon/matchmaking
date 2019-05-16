package com.stackroute.QueryService.controller;

import com.stackroute.QueryService.domain.QueryData;
import com.stackroute.QueryService.resource.QueryResource;
import com.stackroute.QueryService.service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

/*
Controller class for handling post request from search page
 */
@CrossOrigin("*")
@RestController
@RequestMapping("${controller.base}")
public class QueryController {
    private QueryResource queryResource;
    private QueryService queryService;

    @Autowired
    public QueryController(QueryResource queryResource, QueryService queryService){
        this.queryResource = queryResource;
        this.queryService = queryService;
    }

    // Below method is calling methods to send queryData to both kafka and database
    @PostMapping("${controller.search}")
    public ResponseEntity<QueryData> addQueryData(@RequestBody QueryData queryData)
    {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        queryData.setTimeStamp(timestamp);
        ResponseEntity responseEntity = new ResponseEntity(queryData, HttpStatus.OK);
        queryService.addQueryData(queryData);
        queryResource.postQuery(queryData);
        return responseEntity;
    }
}


