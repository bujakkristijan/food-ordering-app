package com.example.foodorderback.dto;



import com.example.foodorderback.model.Meal;
import com.example.foodorderback.model.MealType;


public class MealDTO {
	
 	public Long id;
	private MealType mealType;	
 	private String name;
 	private int price;
 	
 	public MealDTO() {
 		
 	}
 	
 	public MealDTO(Meal meal) {
 		this(meal.getId(), meal.getMealType(), meal.getName(), meal.getPrice());
 	}
 	
 	public MealDTO(Long id, MealType mealType, String name, int price) {
 		this.id = id;
 		this.mealType = mealType;
 		this.name = name;
 		this.price = price;
 	}
 	
 	/*public MealDTO(Meal meal) {

 		this.id = meal.getId();
 		this.mealType = meal.getMealType();
 		this.name = meal.getName();
 		this.price = meal.getPrice();
 	} */

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
