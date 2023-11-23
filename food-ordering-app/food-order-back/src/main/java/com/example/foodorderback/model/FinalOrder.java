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

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class FinalOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	
	@ManyToOne
	private User user;
	
	@JsonIgnore
	@OneToMany(mappedBy="finalOrder" ,fetch = FetchType.LAZY, cascade=CascadeType.ALL)
	private List<OrderItem> orders = new ArrayList<OrderItem>();
	
	private Date date;
	private int finalPrice;
	private String address;
	private String phoneNumber;
	private String status;
	
	public FinalOrder() {
		
	}

	public FinalOrder(Long id, User user, List<OrderItem> orders, Date date, int finalPrice, String address, String phoneNumber,
			String status) {
		super();
		this.id = id;
		this.user = user;
		this.orders = orders;
		this.date = date;
		this.finalPrice = finalPrice;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.status = status;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<OrderItem> getOrders() {
		return orders;
	}

	public void setOrders(List<OrderItem> orders) {
		this.orders = orders;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public int getFinalPrice() {
		return finalPrice;
	}

	public void setFinalPrice(int finalPrice) {
		this.finalPrice = finalPrice;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
