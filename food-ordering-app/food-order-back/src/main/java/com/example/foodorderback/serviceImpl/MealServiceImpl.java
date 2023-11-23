package com.example.foodorderback.serviceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.MealDTO;
import com.example.foodorderback.model.Meal;
import com.example.foodorderback.repository.MealRepository;
import com.example.foodorderback.service.MealService;


@Service
public class MealServiceImpl implements MealService {
	
	@Autowired
	MealRepository mealRepository;
    
	@Override
	public String isValidInput(Meal meal) {
		if (meal.getPrice() < 1 
				|| meal.getMealType() == null || meal.getName() == null || meal.getName().trim().isEmpty()) {
			return "invalid";
		}
		return "valid";
	}

	@Override
	public String save(Meal meal) {
		try {
			mealRepository.save(meal);
			return "success";
		} catch (Exception e) {
			return "fail";
		}
	}

	@Override
	public List<MealDTO> findAll() {
		List<Meal> allMealList = mealRepository.findAll();
		List<MealDTO> allMealDTOList = new ArrayList<MealDTO>();
		MealDTO mealDTO = new MealDTO();
		for (Meal meal : allMealList) {
			//MealDTO mealDTO = MealMapper.INSTANCE.entityToDTO(meal);
			if(meal.isDeleted() == false) {
				mealDTO = new MealDTO(meal);		
				allMealDTOList.add(mealDTO);
			}
		}
		return allMealDTOList;
	}
	
	@Override
	public List<MealDTO> getMealsByMealTypeId(Long mealTypeId){
		List<Meal> allMealList = mealRepository.findAll();
		
		List<MealDTO> mealsByMealTypeIdDTO = new ArrayList<MealDTO>();
		MealDTO mealDTO = new MealDTO();
		for(Meal meal: allMealList) {
			if(meal.getMealType().getId() == mealTypeId && meal.isDeleted() == false) {
				mealDTO = new MealDTO(meal);
				mealsByMealTypeIdDTO.add(mealDTO);
			}
		}
		return mealsByMealTypeIdDTO;
	}

	@Override
	public String delete(Long mealId) {
		try {
			Meal meal = mealRepository.findById(mealId).get();
			meal.setDeleted(true);
			mealRepository.save(meal);
			return "success";
		} catch (Exception e) {
			return "fail";
		}
	}

	@Override
	public Meal findOne(Long id) {
		Meal meal = mealRepository.findById(id).get();
		//MealDTO mealDTO = MealMapper.INSTANCE.entityToDTO(meal);
		//MealDTO mealDTO = new MealDTO(meal);
		//return mealDTO;
		return meal;
	}

	@Override
	public String editMeal(Meal meal) {
		Meal m = mealRepository.findById(meal.getId()).get();
		if (isValidInput(meal).equals("invalid")) {
			return "invalid";
		}
		try {
			m.setPrice(meal.getPrice());
			m.setName(meal.getName());
			m.setMealType(meal.getMealType());
			mealRepository.save(m);
			return "success";
		} catch (Exception e) {
			return "fail";
		}
		
	}

}
