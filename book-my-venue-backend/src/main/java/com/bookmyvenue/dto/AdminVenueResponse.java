package com.bookmyvenue.dto;

import com.bookmyvenue.entities.VenueStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminVenueResponse {
    private Long id;

    private String name;

    private String owner;

    private String city;

    private Integer capacity;

    private BigDecimal pricePerDay;

    private String description;

    private List<String> amenities;

    private VenueStatus status;

    private String img_url;
}
