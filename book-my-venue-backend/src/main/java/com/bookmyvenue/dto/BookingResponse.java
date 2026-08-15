package com.bookmyvenue.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.bookmyvenue.entities.BookingStatus;

import ch.qos.logback.core.spi.ConfigurationEvent.EventType;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
 
@Setter
public class BookingResponse {

	private Long bookingId;
	
	 
	
	private BookingStatus status;
 
	private LocalDate startDate;
	private LocalDate endDate;
	private LocalDateTime bookedAt;
	private Integer noOfGuests;
	private BigDecimal cost;

	private Long venueId;
	
	private String venueName;

	// only populated for the admin-side endpoint
	private String customerName;
	private String customerMobile;
	private String venueOwnerName;
 
}