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
	
	private Meal meal;
	private int quantity;
	
	public ItemFromCartDTO() {
		
	}
	
	public ItemFromCartDTO(OrderItem orderItem) {
		this.meal = orderItem.getMeal();
		this.quantity = orderItem.getQuantity();
	}

	public Meal getMeal() {
		return meal;
	}

	public void setMeal(Meal meal) {
		this.meal = meal;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
}
