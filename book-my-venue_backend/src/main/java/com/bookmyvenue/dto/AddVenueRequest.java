package com.bookmyvenue.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddVenueRequest {

    @NotBlank(message = "Venue name is required.")
    @Size(max = 150)
    String venueName;

    @NotBlank(message = "Description is required.")
    @Size(max = 1000)
    String description;


    @NotBlank(message = "Phone number is required.")
    @Size(max = 20)
    String phoneNo;

    AddressRequest address;

    @NotNull(message = "Price is required.")
    @DecimalMin(
            value = "1.0",
            message = "Price must be greater than 0."
    )
    BigDecimal price;

    @NotNull(message = "Guest capacity is required.")
    @Positive(message = "Guest capacity must be greater than 0.")
    Integer guestCapacity;

     Long packageId;

     List<Long> amenityIds;


    @Valid
    List<FoodCategoryDto> foodMenu;


    // nested DTOs

}
