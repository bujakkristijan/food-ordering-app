package com.example.foodorderback.serviceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.MealDTO;
import com.example.foodorderback.model.Image;
import com.example.foodorderback.model.Meal;
import com.example.foodorderback.repository.FileSystemRepository;
import com.example.foodorderback.repository.ImageDbRepository;
import com.example.foodorderback.repository.MealRepository;
import com.example.foodorderback.service.FileLocationService;
import com.example.foodorderback.service.MealService;


@Service
public class MealServiceImpl implements MealService {
	
	@Autowired
	MealRepository mealRepository;
	
	@Autowired
	FileSystemRepository fileSystemRepository;
	
	
    @Autowired
    ImageDbRepository imageDbRepository;
    
    @Autowired
	FileLocationService fileLocationService;
    
    @Override
    public Long saveImage(byte[] bytes, String imageName) {
        String location = fileSystemRepository.save(bytes, imageName);

        return imageDbRepository.save(new Image(imageName, location))
            .getId();
    }
	
	
	@Override
	public String isValidInput(Meal meal) {
		if (meal.getPrice() < 1 
				|| meal.getMealType() == null || meal.getName() == null || meal.getName().trim().isEmpty()) {
			return "invalid";
		}
		return "valid";
	}

	@Override
	public Meal save(Meal meal) {
		return mealRepository.save(meal);
	}

	@Override
	public List<MealDTO> findAll() {
		List<Meal> allMealList = mealRepository.findAll();
		
		List<MealDTO> allMealDTOList = new ArrayList<MealDTO>();
		MealDTO mealDTO = new MealDTO();

		for (Meal meal : allMealList) {
			//MealDTO mealDTO = MealMapper.INSTANCE.entityToDTO(meal);
			mealDTO = new MealDTO(meal);
			
				allMealDTOList.add(mealDTO);
		
			
		}
		return allMealDTOList;
	}
	
	@Override
	public List<MealDTO> getMealsByMealTypeId(Long mealTypeId){
		List<Meal> allMealList = mealRepository.findAll();
		
		List<MealDTO> mealsByMealTypeIdDTO = new ArrayList<MealDTO>();
		MealDTO mealDTO = new MealDTO();
		for(Meal meal: allMealList) {
			if(meal.getMealType().getId() == mealTypeId) {
				mealDTO = new MealDTO(meal);
				mealsByMealTypeIdDTO.add(mealDTO);
			}
		}
		return mealsByMealTypeIdDTO;
	}

	@Override
	public Meal delete(Meal meal) {
		
		if (meal == null)
			throw new IllegalArgumentException("Attempt to delete non-existing meal.");
		mealRepository.delete(meal);
		return meal;
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
		
		m.setPrice(meal.getPrice());
		m.setName(meal.getName());
		
		m.setMealType(meal.getMealType());
		
		mealRepository.save(m);
		return "success";
	}

	

}
