package com.stackroute.photouploading.service;

import com.stackroute.photouploading.exception.FileStorageException;
import com.stackroute.photouploading.exception.MyFileNotFoundException;
import com.stackroute.photouploading.model.DBFile;
import com.stackroute.photouploading.repository.DBFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


public interface DBFileStorageService {

    public DBFile storeFile(MultipartFile file, String id);
    public DBFile getFile(String fileId);
    public Boolean getFileExist(String fileId);
}
