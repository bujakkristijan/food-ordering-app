package com.example.foodorderback.dto;



import org.springframework.core.io.FileSystemResource;

import com.example.foodorderback.model.Image;
import com.example.foodorderback.model.Meal;
import com.example.foodorderback.model.MealType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


public class MealDTO {
	
 	public Long id;
	private MealType mealType;	
 	private String name;
 	private int price;
 	
 	//@JsonIgnoreProperties("hibernateLazyInitializer")
 	//private FileSystemResource imageFSR;
 	
 	private String image;
 	private String imageName;
 	
 	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public MealDTO() {
 		
 	}
 	
 	public MealDTO(Meal meal) {
 		this(meal.getId(), meal.getMealType(), meal.getName(), meal.getPrice(), meal.getImage(), meal.getImageName());
 	}
 	
 	public MealDTO(Long id, MealType mealType, String name, int price, String image, String imageName) {
 		this.id = id;
 		this.mealType = mealType;
 		this.name = name;
 		this.price = price;
 		this.image = image;
 		this.imageName = imageName;
 	}
 	
 	/*public MealDTO(Meal meal) {

 		this.id = meal.getId();
 		this.mealType = meal.getMealType();
 		this.name = meal.getName();
 		this.price = meal.getPrice();
 	} */

	/*public FileSystemResource getImageFSR() {
		return imageFSR;
	}

	public void setImageFSR(FileSystemResource imageFSR) {
		this.imageFSR = imageFSR;
	}*/

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public MealType getMealType() {
		return mealType;
	}

	public void setMealType(MealType mealType) {
		this.mealType = mealType;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

}
