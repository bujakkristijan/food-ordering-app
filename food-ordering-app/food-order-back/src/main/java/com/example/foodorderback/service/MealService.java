package com.example.foodorderback.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.MealDTO;
import com.example.foodorderback.model.Meal;



@Service
public interface MealService {
	
	String isValidInput(Meal meal);
	List<MealDTO> findAll();
	Meal save(Meal meal);
	
	Meal delete(Meal meal);
	Meal findOne(Long id);
	String editMeal(Meal meal);
	Long saveImage(byte[] content, String imageName);
	
	List<MealDTO> getMealsByMealTypeId(Long id);
	

}
