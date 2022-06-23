package com.example.foodorderback.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class MealType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	
	public String typeName;
	
	/*@JsonIgnore
	@OneToMany(mappedBy="mealType" ,fetch = FetchType.LAZY, cascade=CascadeType.ALL)
	private List<Meal> meals = new ArrayList<Meal>();
	*/
	
	public MealType() {
		
	}
	

	/*public MealType(Long id, String typeName, List<Meal> meals) {
		super();
		this.id = id;
		this.typeName = typeName;
		this.meals = meals;
	} */
	public MealType(Long id, String typeName) {
		super();
		this.id = id;
		this.typeName = typeName;
		
	} 


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	/*public List<Meal> getMeals() {
		return meals;
	}

	public void setMeals(List<Meal> meals) {
		this.meals = meals;
	} */
	
	

}
