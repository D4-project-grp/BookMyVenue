package com.bookmyvenue.dto;

import com.bookmyvenue.entities.VenueStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.w3c.dom.stylesheets.LinkStyle;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VenueCardResponse {
    private Long venueId;

    private String venueName;

    private Integer guestCapacity;

    private String locality;

    private String city;

    private BigDecimal price;

    private VenueStatus status;

    private String img_url;
    
    private Integer rating;
}
