package com.example.foodorderback.serviceImpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.FinalOrderDTO;
import com.example.foodorderback.dto.FinalOrderIdAndStatusDTO;
import com.example.foodorderback.dto.ItemFromCartDTO;
import com.example.foodorderback.dto.OrderItemDTO;
import com.example.foodorderback.model.FinalOrder;
import com.example.foodorderback.model.OrderItem;
import com.example.foodorderback.model.Status;
import com.example.foodorderback.model.User;
import com.example.foodorderback.repository.FinalOrderRepository;
import com.example.foodorderback.repository.OrderItemRepository;
import com.example.foodorderback.service.FinalOrderService;
import com.example.foodorderback.service.MealService;
import com.example.foodorderback.service.UserService;

@Service
public class FinalOrderServiceImpl implements FinalOrderService{

	@Autowired
	FinalOrderRepository finalOrderRepository;
	
	@Autowired
	OrderItemRepository orderItemRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	MealService mealService;
	
	@Override
	public List<FinalOrderDTO> getAllActiveFinalOrders(){
		List<FinalOrder> allFinalOrders = new ArrayList<FinalOrder>();
		List<FinalOrder> allFinalOrdersWithStatusOrdered = new ArrayList<FinalOrder>();
		List<FinalOrderDTO> allFinalOrdersWithStatusOrderedDTO = new ArrayList<FinalOrderDTO>();
		
		FinalOrderDTO finalOrderDTO = new FinalOrderDTO();

		allFinalOrders = finalOrderRepository.findAll();
		
		for(FinalOrder fo: allFinalOrders) {
			if(fo.getStatus().equals("ORDERED") || fo.getStatus().equals("IN PREPARATION")) {
				allFinalOrdersWithStatusOrdered.add(fo);
			}
		}
		for(FinalOrder foStatusOrdered: allFinalOrdersWithStatusOrdered) {
			finalOrderDTO = new FinalOrderDTO(foStatusOrdered);
			allFinalOrdersWithStatusOrderedDTO.add(finalOrderDTO);
		}
		return allFinalOrdersWithStatusOrderedDTO;
	}
	
	@Override
	public List<FinalOrderDTO> getAllMyActiveFinalOrders(Long currentUserId){
		List<FinalOrder> allFinalOrders = new ArrayList<FinalOrder>();
		List<FinalOrder> allFinalOrdersWithStatusOrdered = new ArrayList<FinalOrder>();
		List<FinalOrderDTO> allFinalOrdersWithStatusOrderedDTO = new ArrayList<FinalOrderDTO>();
		
		FinalOrderDTO finalOrderDTO = new FinalOrderDTO();

		allFinalOrders = finalOrderRepository.findAll();
		
		for(FinalOrder fo: allFinalOrders) {
			try {
				if((fo.getStatus().equals("ORDERED") || fo.getStatus().equals("IN PREPARATION")) && fo.getUser().getId() != null) {
					if(fo.getUser().getId() == currentUserId) {
						allFinalOrdersWithStatusOrdered.add(fo);
					}
					
				}
			} catch (Exception e) {
				continue;
			}
			
		}
		for(FinalOrder foStatusOrdered: allFinalOrdersWithStatusOrdered) {
			finalOrderDTO = new FinalOrderDTO(foStatusOrdered);
			allFinalOrdersWithStatusOrderedDTO.add(finalOrderDTO);
		}
		return allFinalOrdersWithStatusOrderedDTO;
	}
	
	@Override
	public List<FinalOrderDTO> getAllMyDeliveredFinalOrders(Long currentUserId){
		List<FinalOrder> allFinalOrders = new ArrayList<FinalOrder>();
		List<FinalOrder> allFinalOrdersWithStatusDelivered = new ArrayList<FinalOrder>();
		List<FinalOrderDTO> allFinalOrdersWithStatusDeliveredDTO = new ArrayList<FinalOrderDTO>();
		
		FinalOrderDTO finalOrderDTO = new FinalOrderDTO();

		allFinalOrders = finalOrderRepository.findAll();
		
		for(FinalOrder fo: allFinalOrders) {
			try {
				if(fo.getStatus().equals("IN DELIVERY") && fo.getUser().getId() != null) {
					if(fo.getUser().getId() == currentUserId){
						allFinalOrdersWithStatusDelivered.add(fo);
					}
					
				}
			} catch (Exception e) {
				continue;
			}
			
		}
		for(FinalOrder foStatusOrdered: allFinalOrdersWithStatusDelivered) {
			finalOrderDTO = new FinalOrderDTO(foStatusOrdered);
			allFinalOrdersWithStatusDeliveredDTO.add(finalOrderDTO);
		}
		return allFinalOrdersWithStatusDeliveredDTO;
	}
	
	@Override
	public List<FinalOrderDTO> getAllDeliveredFinalOrders(){
		List<FinalOrder> allFinalOrders = new ArrayList<FinalOrder>();
		List<FinalOrder> allFinalOrdersWithStatusDelivered = new ArrayList<FinalOrder>();
		List<FinalOrderDTO> allFinalOrdersWithStatusDeliveredDTO = new ArrayList<FinalOrderDTO>();
		
		FinalOrderDTO finalOrderDTO = new FinalOrderDTO();

		allFinalOrders = finalOrderRepository.findAll();
		
		for(FinalOrder fo: allFinalOrders) {
			if(fo.getStatus().equals("IN DELIVERY")) {
				allFinalOrdersWithStatusDelivered.add(fo);
			}
		}
		for(FinalOrder foStatusOrdered: allFinalOrdersWithStatusDelivered) {
			finalOrderDTO = new FinalOrderDTO(foStatusOrdered);
			allFinalOrdersWithStatusDeliveredDTO.add(finalOrderDTO);
		}
		return allFinalOrdersWithStatusDeliveredDTO;
	}
	
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
			//List<OrderItem> orderItems = new ArrayList<OrderItem>();
			FinalOrder finalOrder = new FinalOrder();
			finalOrder.setDate(new Date());
			finalOrder.setStatus("ORDERED");
			finalOrder.setFinalPrice(orderItemDTO.getFinalPrice());
			
			if(userService.getCurrentUser()!=null) {
				User loggedUser = userService.getCurrentUser();
				finalOrder.setAddress(loggedUser.getAddress());
				finalOrder.setPhoneNumber(loggedUser.getPhoneNumber());
				finalOrder.setUser(loggedUser);
				finalOrder.setFinalPrice(orderItemDTO.getFinalPrice());
			}else {
				finalOrder.setAddress(orderItemDTO.getAddress());
				finalOrder.setPhoneNumber(orderItemDTO.getPhoneNumber());
			}			
			FinalOrder savedFinalOrder = save(finalOrder);
			finalOrderId = savedFinalOrder.getId();
			
			for(ItemFromCartDTO itc: orderItemDTO.getItemsFromCart()) {
				OrderItem orderItem = new OrderItem();
				orderItem.setMeal(mealService.findOne(itc.getMealId()));
				orderItem.setMealDescription(itc.getMealDescription());
				//ne cuvam sliku u bazi prilikom kreiranja order item-a da ne bih punio bazu sa slikama jer dosta zauzimaju ako budem radio deployment
				//umesto toga slika ce se ucitavati iz meal tabele prilikom slanja orderItem-a klijentu
				//orderItem.setMealImage(itc.getMealImage());
				orderItem.setMealImageName(itc.getMealImageName());
				orderItem.setMealName(itc.getMealName());
				orderItem.setMealPrice(itc.getMealPrice());
				orderItem.setMealTypeName(itc.getMealTypeName());
				
				orderItem.setQuantity(itc.getQuantity());
				orderItem.setFinalOrder(savedFinalOrder);
				orderItemRepository.save(orderItem);	
				}
		} catch (Exception e) {
			finalOrderId = (long) 0;
		}
		return finalOrderId;	
	}
	
	@Override
	public String setFinalOrderToDelivered(Long finalOrderId) {
		String responseToClient = "fail";
		try {
			FinalOrder finalOrder = findOne(finalOrderId);
			finalOrder.setStatus("DELIVERED");
			finalOrderRepository.save(finalOrder);
			responseToClient = "success";
		} catch (Exception e) {
			return responseToClient;
		}
		return responseToClient;
		
		
	}
	@Override
	public String changeFinalOrderStatus (FinalOrderIdAndStatusDTO foIdStatus) {
		String responseToClient = "fail";
		try {
			FinalOrder finalOrder = findOne(foIdStatus.getActiveOrderId());			
			finalOrder.setStatus(foIdStatus.getStatus());	
			finalOrderRepository.save(finalOrder);
			responseToClient = "success";
		} catch (Exception e) {
			return responseToClient;
		}
		return responseToClient;
	}
	
	@Override
	public String delete(Long finalOrderId) {
		try {
			FinalOrder finalOrder = finalOrderRepository.findById(finalOrderId).get();
			List<OrderItem> allOrderItems = new ArrayList<OrderItem>();
			allOrderItems = orderItemRepository.findAll();
			for(OrderItem oi: allOrderItems) {
				if(oi.getFinalOrder().getId() == finalOrderId) {
					orderItemRepository.delete(oi);
				}
			}
			finalOrderRepository.delete(finalOrder);
			return "success";
		} catch (Exception e) {
			return "fail";
		}
	}
}
