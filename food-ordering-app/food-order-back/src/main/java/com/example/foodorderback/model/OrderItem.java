package com.example.foodorderback.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;


@Entity
public class OrderItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	private Meal meal;
	
	
	private String mealName;
	// mozda bi bilo bolje BigDecimal da se cuva u bazi umesto int
	private int mealPrice;
	private String mealDescription;
	
	@Lob
	private String mealImage;
	private String mealImageName;
	private String mealTypeName;
	
	public String getMealTypeName() {
		return mealTypeName;
	}

	public void setMealTypeName(String mealTypeName) {
		this.mealTypeName = mealTypeName;
	}

	//@JsonIgnore 
	@ManyToOne
	private FinalOrder finalOrder;
	
	//private Date orderDate;
	private int quantity;
	
	public OrderItem() {
		
	}

//	public OrderItem(Long id, Meal meal,FinalOrder finalOrder, int quantity) {
//		super();
//		this.id = id;
//		this.meal = meal;
//		
//		this.finalOrder = finalOrder;
//		this.quantity = quantity;
//	}

	public Long getId() {
		return id;
	}

	public String getMealName() {
		return mealName;
	}

	public void setMealName(String mealName) {
		this.mealName = mealName;
	}

	public int getMealPrice() {
		return mealPrice;
	}

	public void setMealPrice(int mealPrice) {
		this.mealPrice = mealPrice;
	}

	public String getMealDescription() {
		return mealDescription;
	}

	public void setMealDescription(String mealDescription) {
		this.mealDescription = mealDescription;
	}

	public String getMealImage() {
		return mealImage;
	}

	public void setMealImage(String mealImage) {
		this.mealImage = mealImage;
	}

	public String getMealImageName() {
		return mealImageName;
	}

	public void setMealImageName(String mealImageName) {
		this.mealImageName = mealImageName;
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
