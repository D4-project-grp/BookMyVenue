package com.bookmyvenue.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FoodCategoryDto {
    @NotBlank
    String category;
    @Valid
    List<FoodItemDto> items;
}