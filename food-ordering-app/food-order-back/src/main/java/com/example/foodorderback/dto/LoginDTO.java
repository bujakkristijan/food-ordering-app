package com.example.foodorderback.dto;

import com.example.foodorderback.model.User;

public class LoginDTO {
	
	private String token;
	private User user;
	private String messageInvalidUsernameOrPassword;
	
	public LoginDTO() {
		
	}


	public LoginDTO(String token, User user, String messageInvalidUsernameOrPassword) {
		super();
		this.token = token;
		this.user = user;
		this.messageInvalidUsernameOrPassword = messageInvalidUsernameOrPassword;
	}

	public String getMessageInvalidUsernameOrPassword() {
		return messageInvalidUsernameOrPassword;
	}


	public void setMessageInvalidUsernameOrPassword(String messageInvalidUsernameOrPassword) {
		this.messageInvalidUsernameOrPassword = messageInvalidUsernameOrPassword;
	}


	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
