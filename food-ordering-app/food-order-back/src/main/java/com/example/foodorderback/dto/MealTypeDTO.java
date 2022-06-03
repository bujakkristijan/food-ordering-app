package com.example.foodorderback.dto;

import com.example.foodorderback.model.MealType;

public class MealTypeDTO {
	
	private Long id;
	private String typeName;
	
	public MealTypeDTO() {
		
	}
	
	public MealTypeDTO(MealType mealType) {
		this(mealType.getId(), mealType.getTypeName());
	}

	public MealTypeDTO(Long id, String typeName) {
		super();
		this.id = id;
		this.typeName = typeName;
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
