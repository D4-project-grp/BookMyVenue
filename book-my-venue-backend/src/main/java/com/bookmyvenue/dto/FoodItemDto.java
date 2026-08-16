package com.bookmyvenue.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class FoodItemDto {
    @NotBlank
    String name;
    private String imageKey;
    private String description;
    @NotNull
    @DecimalMin("0")
    BigDecimal price;
    boolean hasImage;
}
