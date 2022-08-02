package com.example.foodorderback.controller;

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
import com.example.foodorderback.service.FinalOrderService;
import com.example.foodorderback.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/finalOrder")
public class FinalOrderController {
	
	
	@Autowired
	FinalOrderService finalOrderService;
	
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
	public ResponseEntity<FinalOrderNotLoggedDTO> getFinalOrderById(@PathVariable Long id){
		FinalOrderNotLoggedDTO finalOrderNotLoggedDTO = new FinalOrderNotLoggedDTO();
		try {
			FinalOrder finalOrder = finalOrderService.findOne(id);
			finalOrderNotLoggedDTO = new FinalOrderNotLoggedDTO(finalOrder);
		} catch (Exception e) {
			finalOrderNotLoggedDTO = new FinalOrderNotLoggedDTO();
		}
		
		return new ResponseEntity<FinalOrderNotLoggedDTO>(finalOrderNotLoggedDTO, HttpStatus.OK);
	}
}
