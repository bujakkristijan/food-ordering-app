package com.example.foodorderback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.foodorderback.dto.UserDTO;
import com.example.foodorderback.model.Role;
import com.example.foodorderback.model.User;
import com.example.foodorderback.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping(value = "api/user")
public class UserController {
	
	@Autowired
	UserService userService;

	
	@RequestMapping(value = "/registration", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createUser(@RequestBody User user) {
		//UserDTO userDTO = UserMapper.INSTANCE.entityToDTO(user);
		//UserDTO userDTO = new UserDTO();
		String responseToClient;
		if (userService.validateUser(user).equals("invalid")) {
			//userDTO.setUserInvalidInput("yes");
			responseToClient = "invalidInput";
		} else if (userService.findByUsername(user.getUsername()) != null
				|| userService.validateUser(user).equals("not unique")) {
			//userDTO.setUserAlreadyExist("yes");
			responseToClient = "emailOrUsernameAlreadyExist";
		} else {
			user.setRole(Role.USER); // po defaultu pri registraciji role se setuje na USER
			user.setPassword(user.getPassword());
			userService.save(user);
			//userDTO.setUserAdded("yes");
			responseToClient = "success";
		}
		return new ResponseEntity<String>(responseToClient, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/createEmployee", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createEmployee(@RequestBody User user) {
		//UserDTO userDTO = UserMapper.INSTANCE.entityToDTO(user);
		//UserDTO userDTO = new UserDTO();
		String responseToClient;
		if (userService.validateUser(user).equals("invalid")) {
			//userDTO.setUserInvalidInput("yes");
			responseToClient = "invalidInput";
		} else if (userService.findByUsername(user.getUsername()) != null
				|| userService.validateUser(user).equals("not unique")) {
			//userDTO.setUserAlreadyExist("yes");
			responseToClient = "emailOrPassAlreadyExist";
		} else {
			user.setRole(Role.EMPLOYEE); // po defaultu kada admin kreira zaposlenog, setuje se role na EMPLOYEE
			user.setPassword(user.getPassword());
			userService.save(user);
			//userDTO.setUserAdded("yes");
			responseToClient = "success";
		}
		return new ResponseEntity<String>(responseToClient, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		List<UserDTO> usersDTO = userService.findAll();
		return new ResponseEntity<List<UserDTO>>(usersDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/updateUser", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> updateUser(@RequestBody User u) {
		String validationStatus = userService.validateUserUpdate(u);
		if (!validationStatus.equals("valid")) {
			return new ResponseEntity<String>(validationStatus, HttpStatus.OK);
		}
		String response = userService.updateUser(u);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getCurrentUser", method = RequestMethod.GET)
	public ResponseEntity<User> getCurrentUser() {
		User user = userService.getCurrentUser();
		// UserDTO userDTO = UserMapper.INSTANCE.entityToDTO(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
}
