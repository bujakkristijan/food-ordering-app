package com.example.foodorderback.dto;

import com.example.foodorderback.model.MealType;

public class MealTypeDTO {
	
	private Long id;
	private String typeName;
	private String image;
	private String imageName;
	private String description;
	
	public MealTypeDTO() {
		
	}
	
	public MealTypeDTO(MealType mealType) {
		this(mealType.getId(), mealType.getTypeName(), mealType.getImage(), mealType.getImageName(), mealType.getDescription());
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public MealTypeDTO(Long id, String typeName, String image, String imageName, String description) {
		super();
		this.id = id;
		this.typeName = typeName;
		this.image = image;
		this.imageName = imageName;
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

}
