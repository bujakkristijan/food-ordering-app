package com.example.foodorderback.dto;

public class JWTLogin {
	public String username;
	public String role;
	
	
	public JWTLogin() {
		
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}
}
