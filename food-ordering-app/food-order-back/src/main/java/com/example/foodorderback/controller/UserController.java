package com.example.foodorderback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.foodorderback.dto.PasswordDTO;
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
		String responseToClient = userService.validateUser(user);
		if (!(responseToClient.equals("valid"))) {
			return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
		}
		//ako je uspesno sacuvan user, saveUser metoda vraca "success", ako nije vraca "fail";
		else {
			responseToClient = userService.saveUser(user);
			return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
		}
	}
	
	@RequestMapping(value = "/createEmployee", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> createEmployee(@RequestBody User user) {
		String responseToClient = userService.validateUser(user);
		if (!(responseToClient.equals("valid"))) {
			return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
		}
		//ako je uspesno sacuvan user, saveUser metoda vraca "success", ako nije vraca "fail";
		else {
			responseToClient = userService.saveEmployee(user);
			return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
		}
	}
	
	@RequestMapping(value = "/getAllUsers", method = RequestMethod.GET)
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		List<UserDTO> usersDTO = userService.findAllUsers();
		return new ResponseEntity<List<UserDTO>>(usersDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getAllEmployees", method = RequestMethod.GET)
	public ResponseEntity<List<UserDTO>> getAlEmployees() {
		List<UserDTO> usersDTO = userService.findAllEmployees();
		return new ResponseEntity<List<UserDTO>>(usersDTO, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/updateUser", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> updateUser(@RequestBody UserDTO userDTO) {
		String validationStatus = userService.validateUserUpdate(userDTO);
		if (!validationStatus.equals("valid")) {
			return new ResponseEntity<String>(validationStatus, HttpStatus.OK);
		}
		String response = userService.updateUser(userDTO);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/updateUserByIdAndDetails/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> updateUserByIdAndDetails(@PathVariable Long id, @RequestBody User employeeDetails) {
		if (userService.findOne(id) == null) {
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		// sa fronta se ne salje id i role, pa se ovde setuje
		User user = userService.findOne(id);
		employeeDetails.setId(user.getId());
		employeeDetails.setRole(user.getRole());
		String validationStatus = userService.validateEmployeeUpdate(employeeDetails);
		if (!validationStatus.equals("valid")) {
			return new ResponseEntity<String>(validationStatus, HttpStatus.OK);
		}
		String response = userService.updateEmployee(employeeDetails);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getCurrentUser", method = RequestMethod.GET)
	public ResponseEntity<User> getCurrentUser() {
		User user = userService.getCurrentUser();
		// UserDTO userDTO = UserMapper.INSTANCE.entityToDTO(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
		if (userService.findOne(id) == null) {
			return new ResponseEntity<UserDTO>(HttpStatus.NOT_FOUND);
		}	
		User user = userService.findOne(id);
	
		return new ResponseEntity<UserDTO>(new UserDTO(user), HttpStatus.OK);
	}
	//mora bez consumes, jer se sad ne salje nikakav json objekat, vec samo id u putanji
	@RequestMapping(value = "/deactivateUser/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> deactivateUser(@PathVariable Long id) {
		if (userService.findOne(id) == null) {
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		}
		String response = userService.deactivateUser(id);
		return new ResponseEntity<String>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/changePassword", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> changePassword(@RequestBody PasswordDTO passwordDTO) {
			String responseToClient = userService.changePassword(passwordDTO);
			return new ResponseEntity<String>(responseToClient, HttpStatus.OK);
		}
	
	
}
