package com.example.foodorderback.serviceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.FinalOrderDTO;
import com.example.foodorderback.dto.ItemFromCartDTO;
import com.example.foodorderback.dto.OrderItemDTO;
import com.example.foodorderback.model.FinalOrder;
import com.example.foodorderback.model.OrderItem;
import com.example.foodorderback.model.Status;
import com.example.foodorderback.model.User;
import com.example.foodorderback.repository.FinalOrderRepository;
import com.example.foodorderback.repository.OrderItemRepository;
import com.example.foodorderback.service.FinalOrderService;
import com.example.foodorderback.service.UserService;

@Service
public class FinalOrderServiceImpl implements FinalOrderService{

	@Autowired
	FinalOrderRepository finalOrderRepository;
	
	@Autowired
	OrderItemRepository orderItemRepository;
	
	@Autowired
	UserService userService;
	
	
	
	@Override
	public FinalOrder findOne(Long id) {
		return finalOrderRepository.findById(id).get();
	}
	
	@Override
	public FinalOrder save(FinalOrder finalOrder) {
		return finalOrderRepository.save(finalOrder);
	}
	
	@Override
	public Long makeFinalOrder(OrderItemDTO orderItemDTO) {
		Long finalOrderId = (long) 0;
		try {
			List<OrderItem> orderItems = new ArrayList<OrderItem>();
			//OrderItem orderItem = new OrderItem();
			
			FinalOrder finalOrder = new FinalOrder();
			finalOrder.setDate(new Date());
			finalOrder.setStatus(Status.ORDERED);
			finalOrder.setFinalPrice(orderItemDTO.getFinalPrice());
			
			
			
			
			if(userService.getCurrentUser()!=null) {
				User loggedUser = userService.getCurrentUser();
				finalOrder.setAddress(loggedUser.getAddress());
				finalOrder.setPhoneNumber(loggedUser.getPhoneNumber());
				finalOrder.setUser(loggedUser);
			}else {
				finalOrder.setAddress(orderItemDTO.getAddress());
				finalOrder.setPhoneNumber(orderItemDTO.getPhoneNumber());
			}
			
			
			FinalOrder savedFinalOrder = save(finalOrder);
			finalOrderId = savedFinalOrder.getId();
			
			for(ItemFromCartDTO itc: orderItemDTO.getItemsFromCart()) {
				OrderItem orderItem = new OrderItem();
				orderItem.setMeal(itc.getMeal());
				orderItem.setQuantity(itc.getQuantity());
				orderItem.setFinalOrder(savedFinalOrder);
				orderItemRepository.save(orderItem);
				//orderItems.add(orderItem);	
				}
			
//			for(OrderItem oi: orderItems) {
//				oi.setFinalOrder(savedFinalOrder);
//				orderItemRepository.save(oi);
//			}
		} catch (Exception e) {
			finalOrderId = (long) 0;
		}
		return finalOrderId;
		
		
	}
}
