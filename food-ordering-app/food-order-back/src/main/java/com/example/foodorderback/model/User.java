package com.example.foodorderback.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;


import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private String firstName;	
	private String lastName;
	private String username;
	private String password;
	private String email;
	private Role role;
	private String phoneNumber;
	private String address;
	private boolean deleted;
	
	
	
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade=CascadeType.ALL)
	private List<FinalOrder> finalOrders = new ArrayList<FinalOrder>();

	public User() {
		
	}

	public User(Long id, String firstName, String lastName, String username, String password, String email, Role role,
			String phoneNumber, String address, boolean deleted,List<FinalOrder> finalOrders) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.deleted = deleted;
		
		this.finalOrders = finalOrders;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}


	public List<FinalOrder> getFinalOrders() {
		return finalOrders;
	}

	public void setFinalOrders(List<FinalOrder> finalOrders) {
		this.finalOrders = finalOrders;
	}
	
	
}
