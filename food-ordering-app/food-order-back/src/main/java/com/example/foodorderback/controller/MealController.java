package com.example.foodorderback.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.foodorderback.dto.MealDTO;
import com.example.foodorderback.model.Meal;
import com.example.foodorderback.model.Role;
import com.example.foodorderback.model.User;
import com.example.foodorderback.service.MealService;
import com.google.gson.Gson;

import antlr.StringUtils;
@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/meal")
public class MealController {
	
	@Autowired
	MealService mealService;
	
	@RequestMapping(value = "/getAllMeals", method = RequestMethod.GET)
	public ResponseEntity<List<MealDTO>> getAllMeals() {
		List<MealDTO> allMealDTOList = mealService.findAll();
		return new ResponseEntity<List<MealDTO>>(allMealDTOList, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getMealsByMealTypeId/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<MealDTO>> getMealsByMealTypeId(@PathVariable Long id){
		List<MealDTO> mealsByMealTypeId = mealService.getMealsByMealTypeId(id);
		return new ResponseEntity<List<MealDTO>>(mealsByMealTypeId, HttpStatus.OK);
	}
	
	//, @RequestParam("meal") MultipartFile meal
	@RequestMapping(value = "/createMeal", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> createMeal(@RequestParam("image") MultipartFile image, HttpServletRequest request) {
		
		System.out.println(request.getParameter("meal"));	
		Gson g = new Gson();  
		Meal meal = g.fromJson(request.getParameter("meal"), Meal.class);
		System.out.println("MEAL " + meal);
		
		String responseToClient;
		responseToClient = mealService.isValidInput(meal);
		if (!(responseToClient.equals("valid"))) {
			return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
		}
		else {
			try {
				meal.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
				meal.setImageName(image.getOriginalFilename());
				responseToClient = mealService.save(meal);
				return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
			} catch (IOException e) {
				responseToClient = "fail";
				return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
			}
		}
	}
	
	@RequestMapping(value = "/updateMeal", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> editMeal(@RequestBody Meal meal){
		String response = mealService.editMeal(meal);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/deleteMeal/{id}", method = RequestMethod.PUT)
	public ResponseEntity<String> delete(@PathVariable Long id) {
		String responseToClient = mealService.delete(id);;
		return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
	}

}
