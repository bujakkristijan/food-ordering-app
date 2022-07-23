package com.example.foodorderback.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodorderback.model.OrderItem;
import com.example.foodorderback.repository.OrderItemRepository;
import com.example.foodorderback.service.OrderItemService;

@Service
public class OrderItemServiceImpl implements OrderItemService{

	@Autowired
	OrderItemRepository orderItemRepository;
	
	@Override
	public OrderItem save(OrderItem orderItem) {
		return orderItemRepository.save(orderItem);
	}
}
