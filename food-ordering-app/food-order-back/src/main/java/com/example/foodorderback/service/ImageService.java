package com.example.foodorderback.service;

import org.springframework.stereotype.Service;

import com.example.foodorderback.model.Image;

@Service
public interface ImageService {
	
	Image findOne(Long id);

}
