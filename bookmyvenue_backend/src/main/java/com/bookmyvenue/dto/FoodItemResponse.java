package com.bookmyvenue.dto;

import java.math.BigDecimal;
import java.util.List;

import com.bookmyvenue.entities.FoodType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
 
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FoodItemResponse {
	    Long id;
	    
	    String foodName;
	    
	    FoodType foodType;
	    
	    private BigDecimal price;
	    
	    private String imgUrl;
	    
	    private String description;
	    
	     
}
