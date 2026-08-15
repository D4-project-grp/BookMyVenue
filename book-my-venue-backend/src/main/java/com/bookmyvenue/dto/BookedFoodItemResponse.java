package com.bookmyvenue.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookedFoodItemResponse {

	 
	private Long foodItemId;
	private String foodItemName;
	private BigDecimal price; // unit price at time of booking
	private BigDecimal totalCost;  // price * guests, as stored on BookedFoodItem
}
