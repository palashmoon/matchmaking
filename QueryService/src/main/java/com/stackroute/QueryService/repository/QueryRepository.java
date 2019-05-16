package com.stackroute.QueryService.repository;

import com.stackroute.QueryService.domain.QueryData;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/* This interface is used to perform database operation on MongoDB*/
@Repository
public interface QueryRepository extends MongoRepository<QueryData,String>{
}





