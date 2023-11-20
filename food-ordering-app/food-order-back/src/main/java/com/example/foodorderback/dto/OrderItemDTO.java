package com.example.foodorderback.dto;

import java.util.List;

public class OrderItemDTO {
	
	private List<ItemFromCartDTO> itemsFromCart;
	private String address;
	private String phoneNumber;
	// mozda sam trebao double da cuvam umesto int
	private int finalPrice;
	
	public int getFinalPrice() {
		return finalPrice;
	}

	public void setFinalPrice(int finalPrice) {
		this.finalPrice = finalPrice;
	}

	public OrderItemDTO() {
		
	}

	public List<ItemFromCartDTO> getItemsFromCart() {
		return itemsFromCart;
	}

	public void setItemsFromCart(List<ItemFromCartDTO> itemsFromCart) {
		this.itemsFromCart = itemsFromCart;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	
}
