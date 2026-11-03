package com.bookmyvenue.dto;

import jakarta.validation.constraints.Size;

public class FoodMenuRequest {
    @Size(
            max = 150,
            message = "Food category must not exceed 150 characters."
    )
    String category;

    @Size(
            max = 3000,
            message = "Food items list is too long."
    )
    String items;
}
