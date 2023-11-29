package com.example.foodorderback.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.MealDTO;
import com.example.foodorderback.dto.MealTypeDTO;
import com.example.foodorderback.model.Meal;
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
			if(mealType.isDeleted() == false) {
				allMealTypesDTO.add(new MealTypeDTO(mealType));
			}	
		}
		return allMealTypesDTO;
	}
	
	@Override
	public String isValidInput(MealType mealType) {
		if (mealType.getTypeName() == null  || mealType.getTypeName().trim().isEmpty() || mealType.getDescription() == null ||
				mealType.getDescription().trim().isEmpty()) {
			return "invalid";
		}
		return "valid";
	}

	@Override
	public String save(MealType mealType) {
		try {
			mealTypeRepository.save(mealType);
			return "success";
		} catch (Exception e) {
			return "fail";
		}
		
	}
	
	@Override
	public String delete(Long mealTypeId) {
		try {
			MealType mealType = mealTypeRepository.findById(mealTypeId).get();
			mealType.setDeleted(true);
			mealTypeRepository.save(mealType);
			return "success";
		} catch (Exception e) {
			return "fail";
		}
	}

	@Override
	public MealType findOne(Long id) {
		MealType mealType = mealTypeRepository.findById(id).get();
		//MealDTO mealDTO = MealMapper.INSTANCE.entityToDTO(meal);
		//MealTypeDTO mealTypeDTO = new MealTypeDTO(mealType);
		//return mealTypeDTO;
		return mealType;
	}

	@Override
	public String editMealType(MealType mealType) {
		MealType mt = mealTypeRepository.findById(mealType.getId()).get();
		if (isValidInput(mealType).equals("invalid")) {
			return "invalid";
		}
		mt.setTypeName(mealType.getTypeName());
		mt.setDescription(mealType.getDescription());	
		mealTypeRepository.save(mt);
		return "success";
	}	

}
