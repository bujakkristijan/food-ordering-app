package com.example.foodorderback.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodorderback.model.Image;
import com.example.foodorderback.repository.FileSystemRepository;
import com.example.foodorderback.repository.ImageDbRepository;

@Service
public class FileLocationService {
	
	@Autowired
    FileSystemRepository fileSystemRepository;
    @Autowired
    ImageDbRepository imageDbRepository;

    public Long save(byte[] bytes, String imageName) throws Exception {
        String location = fileSystemRepository.save(bytes, imageName);

        return imageDbRepository.save(new Image(imageName, location))
            .getId();
    }

}
