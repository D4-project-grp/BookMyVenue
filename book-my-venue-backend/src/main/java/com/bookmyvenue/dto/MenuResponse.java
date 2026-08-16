package com.bookmyvenue.dto;

import java.util.List;

import com.bookmyvenue.entities.MenuType;

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
public class MenuResponse {
	 
    Long id;
    
    private MenuType menuType;
    
    List<FoodItemResponse> items;
}
