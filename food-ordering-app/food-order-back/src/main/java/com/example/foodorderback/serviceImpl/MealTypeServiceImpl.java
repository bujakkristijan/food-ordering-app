package com.example.foodorderback.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.MealTypeDTO;
import com.example.foodorderback.model.MealType;
import com.example.foodorderback.repository.MealTypeRepository;
import com.example.foodorderback.service.MealTypeService;


@Service
public class MealTypeServiceImpl implements MealTypeService{
	
	@Autowired
	MealTypeRepository mealTypeRepository;
	
	@Override
	public List<MealTypeDTO> getAllMealTypes(){
		List<MealType> allMealTypes = mealTypeRepository.findAll();
		List<MealTypeDTO> allMealTypesDTO = new ArrayList<MealTypeDTO>();
		for(MealType mealType: allMealTypes) {
			allMealTypesDTO.add(new MealTypeDTO(mealType));
		}
		return allMealTypesDTO;
	}

	

}
