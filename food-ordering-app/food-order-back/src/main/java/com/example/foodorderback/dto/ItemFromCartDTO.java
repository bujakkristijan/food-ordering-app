package com.example.foodorderback.dto;

import com.example.foodorderback.model.Meal;
import com.example.foodorderback.model.OrderItem;

public class ItemFromCartDTO {
	
	//trebao sam cuvati trenutne vrednosti meal-a kada se kreira i cuva orderItem u bazi, a ne da cuvam samo meal_id u bazi
	//jer ako se izmeni cena meal-a naknadno, izmenice se i vrednosti, npr cena za stare porudzbine !!!
	//isto tako bolje da sam slao nazad varijable koje su mi neophodne (naziv, ime tipa itd.) 
	//umesto ceo objekat sto saljem nazad na osnovu meal id-a
	//takodje, najbolje bi bilo slati samo varijable klijentu, a ne objekte
	//jer se onda ulancaju objekti prilikom slanja i previse nepotrebnih podataka se posalje, sto nije dobro sigurno
	//o ovome nisam razmisljao na pocetku, pa je ostalo tako za sada
	
	//private Meal meal;
//	private MealFromCartDTO mealFromCartDTO;
	private Long mealId;
	private String mealName;
	private String mealTypeName;
	private String mealDescription;
	private String mealImage;
	private String mealImageName;
	private int mealPrice;
	
	private int quantity;
	
	public ItemFromCartDTO() {
		
	}
	
	public ItemFromCartDTO(OrderItem orderItem) {
		this.mealId = orderItem.getMeal().getId();
		this.mealName = orderItem.getMealName();
		this.mealTypeName = orderItem.getMealTypeName();
		this.mealDescription = orderItem.getMealDescription();
		//this.mealImage = orderItem.getMealImage();
		// na ovaj nacin setujem sliku ako budem radio deployment jer necu da je cuvam u bazi svaki put prilikom kreiranja orderItema-a, uzimam iz meal objekta, jer ce se dosta memorije zauzimati verovatno
		this.mealImage = orderItem.getMeal().getImage();
		this.mealImageName = orderItem.getMealImageName();
		this.mealPrice = orderItem.getMealPrice();
		
		this.quantity = orderItem.getQuantity();
	}
//
//	public Meal getMeal() {
//		return meal;
//	}
//
//	public void setMeal(Meal meal) {
//		this.meal = meal;
//	}

//	public MealFromCartDTO getMealFromCartDTO() {
//		return mealFromCartDTO;
//	}
//
//	public void setMealFromCartDTO(MealFromCartDTO mealFromCartDTO) {
//		this.mealFromCartDTO = mealFromCartDTO;
//	}

	public int getQuantity() {
		return quantity;
	}

	public Long getMealId() {
		return mealId;
	}

	public void setMealId(Long mealId) {
		this.mealId = mealId;
	}

	public String getMealName() {
		return mealName;
	}

	public void setMealName(String mealName) {
		this.mealName = mealName;
	}

	public String getMealTypeName() {
		return mealTypeName;
	}

	public void setMealTypeName(String mealTypeName) {
		this.mealTypeName = mealTypeName;
	}

	public String getMealDescription() {
		return mealDescription;
	}

	public void setMealDescription(String mealDescription) {
		this.mealDescription = mealDescription;
	}

	public String getMealImage() {
		return mealImage;
	}

	public void setMealImage(String mealImage) {
		this.mealImage = mealImage;
	}

	public String getMealImageName() {
		return mealImageName;
	}

	public void setMealImageName(String mealImageName) {
		this.mealImageName = mealImageName;
	}

	public int getMealPrice() {
		return mealPrice;
	}

	public void setMealPrice(int mealPrice) {
		this.mealPrice = mealPrice;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
}
