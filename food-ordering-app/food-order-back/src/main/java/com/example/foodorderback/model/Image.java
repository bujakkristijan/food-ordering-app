package com.example.foodorderback.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
public class Image {
	
	@Id
    @GeneratedValue
    Long id;

    String location;
    
    String name;
    
    @Lob
    byte[] content;
    // Getters and Setters
    
    public Image() {
    	
    }

    public Image(Long id, String location, String name, byte[] content) {
		super();
		this.id = id;
		this.location = location;
		this.name = name;
		this.content = content;
	}
    
    public Image(String name, String location) {
    	this.name = name;
    	this.location = location;
    }

	public byte[] getContent() {
		return content;
	}

	public void setContent(byte[] content) {
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

}
