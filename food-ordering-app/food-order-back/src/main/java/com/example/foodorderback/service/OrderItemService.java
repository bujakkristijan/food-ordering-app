package com.example.foodorderback.service;

import org.springframework.stereotype.Service;

import com.example.foodorderback.model.OrderItem;

@Service
public interface OrderItemService {
	
	OrderItem save(OrderItem orderItem);

}
