package com.stackroute.photouploading.repository;

import com.stackroute.photouploading.model.DBFile;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
// Repository for Storing Files and Images
@Repository
public interface DBFileRepository extends JpaRepository<DBFile, String> {

}
