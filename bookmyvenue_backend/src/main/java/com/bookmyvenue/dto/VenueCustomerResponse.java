package com.bookmyvenue.dto;
import com.bookmyvenue.entities.Amenity;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;



@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VenueCustomerResponse {
    Long venueId;
    
    String venueName;

    String description;

    String phoneNo;

    AddressRequest address;

    BigDecimal price;

    Integer guestCapacity;

   

    List<String> amenities;

    List<String> venue_images;
 
}
