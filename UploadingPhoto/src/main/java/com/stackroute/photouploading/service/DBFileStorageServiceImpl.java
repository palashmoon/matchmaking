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
@Service
public class DBFileStorageServiceImpl implements DBFileStorageService {

   private DBFileRepository dbFileRepository;

    @Autowired
    public DBFileStorageServiceImpl(DBFileRepository dbFileRepository) {
        this.dbFileRepository = dbFileRepository;
    }

    @Override
    public DBFile storeFile(MultipartFile file, String id) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            DBFile dbFile = new DBFile(id, fileName, file.getContentType(), file.getBytes());

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @Override
    public DBFile getFile(String fileId) {
        return dbFileRepository.findById(fileId)
                .orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
    }

    @Override
    public Boolean getFileExist(String fileId) {
        if(dbFileRepository.existsById(fileId))
            return true;
        else
            return false;
    }
}
