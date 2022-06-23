package com.example.foodorderback.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Meal {
	
	@Id
 	@GeneratedValue(strategy = GenerationType.IDENTITY)
 	public Long id;
 	

	//@ManyToOne
	@OneToOne
	private MealType mealType;
	
	
	@JsonIgnore
	@OneToMany(mappedBy="meal" ,fetch = FetchType.LAZY, cascade=CascadeType.ALL)
	private List<OrderItem> orders = new ArrayList<OrderItem>();
 	
 	private String name;
 	private int price;
 	
 	public Meal() {
 		
 	}

	public Meal(Long id, MealType mealType, List<OrderItem> orders, String name, int price) {
		super();
		this.id = id;
		this.mealType = mealType;
		this.orders = orders;
		this.name = name;
		this.price = price;
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

	public List<OrderItem> getOrders() {
		return orders;
	}

	public void setOrders(List<OrderItem> orders) {
		this.orders = orders;
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
