package com.example.foodorderback.dto;

import java.util.Date;

import com.example.foodorderback.model.FinalOrder;



public class FinalOrderDTO {
	
	
	public Long id;
	
	
	
	private String phoneNumber;
	
	private Date date;
	private int finalPrice;
	private String address;
	private String status;
	
	
	public FinalOrderDTO() {
		
	}
	
	public FinalOrderDTO(FinalOrder finalOrder) {
		this.id = finalOrder.id;
		this.address = finalOrder.getAddress();
		this.phoneNumber = finalOrder.getPhoneNumber();
		this.date = finalOrder.getDate();
		this.finalPrice = finalOrder.getFinalPrice();
		this.status = finalOrder.getStatus();
		
		
	}

	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
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
