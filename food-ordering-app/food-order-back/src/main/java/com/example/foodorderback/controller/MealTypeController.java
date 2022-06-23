package com.example.foodorderback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.foodorderback.dto.MealTypeDTO;
import com.example.foodorderback.service.MealTypeService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/mealType")
public class MealTypeController {

	@Autowired
	MealTypeService mealTypeService;

	@RequestMapping(value = "/getAllMealTypes", method = RequestMethod.GET)
	public ResponseEntity<List<MealTypeDTO>> getAllMaelTypeList() {
		List<MealTypeDTO> allMealTypeDTOList = mealTypeService.getAllMealTypes();
		return new ResponseEntity<List<MealTypeDTO>>(allMealTypeDTOList, HttpStatus.OK);
	}
}