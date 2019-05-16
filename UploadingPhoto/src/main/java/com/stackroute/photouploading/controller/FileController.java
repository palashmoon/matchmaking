package com.stackroute.photouploading.controller;

import com.stackroute.photouploading.model.DBFile;
import com.stackroute.photouploading.service.DBFileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@RequestMapping(value="api/v1")
public class FileController {

    DBFileStorageService dBFileStorageService;

    @Autowired
    public FileController(DBFileStorageService dBFileStorageService){
        this.dBFileStorageService = dBFileStorageService;
    }

    // End Point for saving and updating the file in Repository
    @PostMapping("/uploadFile/{fileId}")
    public String uploadFile(@RequestParam("file") MultipartFile file, @PathVariable String fileId) {
        DBFile dbFile = dBFileStorageService.storeFile(file, fileId);
        return dbFile.getFileName();
    }

    // End Point for getting the file from repository
    @GetMapping("/downloadFile/{fileId}")
    public byte[] downloadFile(@PathVariable String fileId) {
        // Load file from database
        DBFile dbFile = dBFileStorageService.getFile(fileId);
        return dbFile.getData();
    }

    // End Point for getting fileName from Repository
    @GetMapping("/downloadFileType/{fileId}")
    public String downloadFileName(@PathVariable String fileId) {
        // Load file from database
        DBFile dbFile = dBFileStorageService.getFile(fileId);
        return dbFile.getFileType();
    }

    @GetMapping("/fileExists/{fileId}")
    public Boolean fileExist(@PathVariable String fileId) {
        return dBFileStorageService.getFileExist(fileId);
    }

}
