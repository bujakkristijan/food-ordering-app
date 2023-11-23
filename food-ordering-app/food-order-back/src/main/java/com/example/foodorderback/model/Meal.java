package com.example.foodorderback.model;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import org.springframework.core.io.FileSystemResource;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Meal {
	
	@Id
 	@GeneratedValue(strategy = GenerationType.IDENTITY)
 	public Long id;
 	
	@OneToOne
	private MealType mealType;

//	@JsonIgnore
//	@OneToMany(mappedBy="meal" ,fetch = FetchType.LAZY, cascade=CascadeType.ALL)
//	private List<OrderItem> orders = new ArrayList<OrderItem>();
 	
 	private String name;
 	private int price;
 	
 	@Lob
	//@Column(columnDefinition = "MEDIUMBLOB")
	private String image;
 	
 	private String imageName;
 	private String description;
 	private boolean isDeleted;
 	
 

	public Meal() {
 		
 	}

	public Meal(Long id, MealType mealType, String name, int price, String imageName) {
		super();
		this.id = id;
		this.mealType = mealType;
		this.name = name;
		this.price = price;
		this.imageName = imageName;
	}
	
	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public Long getId() {
		return id;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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

//	public List<OrderItem> getOrders() {
//		return orders;
//	}
//
//	public void setOrders(List<OrderItem> orders) {
//		this.orders = orders;
//	}

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
