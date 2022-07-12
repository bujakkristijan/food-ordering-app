package com.example.foodorderback.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class MealType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	
	public String typeName;
	
	@Lob
	public String image;
	
	public String imageName;
	
	public String description;
	
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
	public MealType(Long id, String typeName, String image, String imageName, String description) {
		super();
		this.id = id;
		this.typeName = typeName;
		this.image = image;
		this.imageName = imageName;
		this.description = description;
		
	} 


	public String getImageName() {
		return imageName;
	}


	public void setImageName(String imageName) {
		this.imageName = imageName;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
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
