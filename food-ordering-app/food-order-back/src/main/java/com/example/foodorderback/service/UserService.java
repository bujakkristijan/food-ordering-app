package com.example.foodorderback.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.foodorderback.dto.LoginDTO;
import com.example.foodorderback.dto.UserDTO;
import com.example.foodorderback.model.Login;
import com.example.foodorderback.model.User;


@Service
public interface UserService {
	
	List<UserDTO> findAllUsers();
	List<UserDTO> findAllEmployees();
	User save(User user);
	User findOne(Long id);
	User findByUsername(String username);
	User delete(User user);
	User getCurrentUser();
	String validateUser(User user);
	String validateUserUpdate(User user);
	String updateUser(User u);
	LoginDTO generateToken(Login login); 
	String isValidLogout();
	String deactivateUser(Long id);
	
	public void setCurrentUser(User user);

}
