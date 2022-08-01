package com.example.foodorderback.service;

import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.OrderItemDTO;
import com.example.foodorderback.model.FinalOrder;

@Service
public interface FinalOrderService {
	
	FinalOrder save(FinalOrder finalOrder);
	Long makeFinalOrder(OrderItemDTO orderItemDTO);
	FinalOrder findOne(Long id);

}
