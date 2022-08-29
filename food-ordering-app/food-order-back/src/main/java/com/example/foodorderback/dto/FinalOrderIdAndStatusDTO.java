package com.example.foodorderback.dto;

public class FinalOrderIdAndStatusDTO {
	
	public Long activeOrderId;
	public String status;
	
	public FinalOrderIdAndStatusDTO() {
		
	}

	public Long getActiveOrderId() {
		return activeOrderId;
	}

	public void setActiveOrderId(Long activeOrderId) {
		this.activeOrderId = activeOrderId;
	}


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
