package com.example.foodorderback.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.foodorderback.model.Image;

import com.example.foodorderback.repository.ImageDbRepository;
import com.example.foodorderback.service.ImageService;
@Service
public class ImageServiceImpl implements ImageService{
	@Autowired
	ImageDbRepository imageDbRepository;
	@Override
	public Image findOne(Long id) {
		Image image = imageDbRepository.findById(id).get();
		//MealDTO mealDTO = MealMapper.INSTANCE.entityToDTO(meal);
		
		return image;
	}

}
