package com.example.foodorderback.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class OrderItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	
	
	@ManyToOne
	public Meal meal;
	
	
	@ManyToOne
	public User user;
	
	//@JsonIgnore 
	@ManyToOne
	public FinalOrder finalOrder;
	
	//private Date orderDate;
	private int quantity;
	
	public OrderItem() {
		
	}

	public OrderItem(Long id, Meal meal, User user, FinalOrder finalOrder, int quantity) {
		super();
		this.id = id;
		this.meal = meal;
		this.user = user;
		this.finalOrder = finalOrder;
		this.quantity = quantity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Meal getMeal() {
		return meal;
	}

	public void setMeal(Meal meal) {
		this.meal = meal;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public FinalOrder getFinalOrder() {
		return finalOrder;
	}

	public void setFinalOrder(FinalOrder finalOrder) {
		this.finalOrder = finalOrder;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	

}
