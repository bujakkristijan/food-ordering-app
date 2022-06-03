package com.example.foodorderback.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.MealTypeDTO;

@Service
public interface MealTypeService {
	public List<MealTypeDTO> getAllMealTypes();
}
