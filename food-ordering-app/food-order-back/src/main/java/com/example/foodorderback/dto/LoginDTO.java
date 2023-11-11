package com.example.foodorderback.dto;



public class LoginDTO {
	
	private String token;
	
	private String message;
	
	public LoginDTO() {
		
	}

	public LoginDTO(String token, String message) {
		super();
		this.token = token;
		this.message = message;
		
	}

	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
