package com.example.foodorderback.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.foodorderback.dto.FinalOrderDTO;
import com.example.foodorderback.dto.FinalOrderNotLoggedDTO;
import com.example.foodorderback.dto.ItemFromCartDTO;
import com.example.foodorderback.dto.OrderItemDTO;
import com.example.foodorderback.model.FinalOrder;
import com.example.foodorderback.model.OrderItem;
import com.example.foodorderback.service.FinalOrderService;
import com.example.foodorderback.service.OrderItemService;
import com.example.foodorderback.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/finalOrder")
public class FinalOrderController {
	
	
	@Autowired
	FinalOrderService finalOrderService;
	
	@Autowired
	OrderItemService orderItemService;
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/welcomeTest", method = RequestMethod.GET)
	public String welcome() {
		return "IDEMO NISSSS!!!";
	}
	
	@RequestMapping(value ="/createFinalOrder",  method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Long> saveFinalOrderUser(@RequestBody OrderItemDTO orderItemDTO){
		Long responseToClient;
		
		responseToClient = finalOrderService.makeFinalOrder(orderItemDTO);
		return new ResponseEntity<Long>(responseToClient, HttpStatus.OK);
	}
	
	@RequestMapping(value ="/getFinalOrderById/{id}", method = RequestMethod.GET)
	public ResponseEntity<FinalOrder> getFinalOrderById(@PathVariable Long id){
		FinalOrder finalOrder = new FinalOrder();
		try {
			finalOrder = finalOrderService.findOne(id);
			
		} catch (Exception e) {
			finalOrder = new FinalOrder();
		}
		
		return new ResponseEntity<FinalOrder>(finalOrder, HttpStatus.OK);
	}
	
	@RequestMapping(value ="/getAllActiveFinalOrders", method = RequestMethod.GET)
	public ResponseEntity<List<FinalOrderDTO>> getAllActiveFinalOrders(){	
		List<FinalOrderDTO> allActiveFinalOrders = new ArrayList<FinalOrderDTO>();
		allActiveFinalOrders = finalOrderService.getAllActiveFinalOrders();
		return new ResponseEntity<List<FinalOrderDTO>>(allActiveFinalOrders, HttpStatus.OK);
	}
	
//	@RequestMapping(value ="/getFinalOrderById/{id}", method = RequestMethod.GET)
//	public ResponseEntity<FinalOrderNotLoggedDTO> getFinalOrderById(@PathVariable Long id){
//		FinalOrderNotLoggedDTO finalOrderNotLoggedDTO = new FinalOrderNotLoggedDTO();
//		try {
//			FinalOrder finalOrder = finalOrderService.findOne(id);
//			finalOrderNotLoggedDTO = new FinalOrderNotLoggedDTO(finalOrder);
//		} catch (Exception e) {
//			finalOrderNotLoggedDTO = new FinalOrderNotLoggedDTO();
//		}
//		
//		return new ResponseEntity<FinalOrderNotLoggedDTO>(finalOrderNotLoggedDTO, HttpStatus.OK);
//	}
	
	@RequestMapping(value ="/getOrderItemsByFinalOrderId/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<ItemFromCartDTO>> getOrderItemsByFinalOrderId(@PathVariable Long id){
		List<ItemFromCartDTO> itemsFromCartByFinalOrderId = new ArrayList<ItemFromCartDTO>();
		itemsFromCartByFinalOrderId = orderItemService.getItemFromCartByFinalOrderId(id);
		return new ResponseEntity<List<ItemFromCartDTO>>(itemsFromCartByFinalOrderId, HttpStatus.OK);
	}
}
