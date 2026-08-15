package com.bookmyvenue.dto;

import java.time.LocalDate;
import java.util.List;

import com.bookmyvenue.entities.EventType;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

 
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreateBookingRequest{

	@JsonProperty("venue_id")
	@NotNull(message = "venueId is required")
	private Long venueId;

	@JsonProperty("event_type")
	@NotNull(message = "eventType is required")
	private EventType eventType;

	@JsonProperty("start_date")
	@NotNull(message = "startDate is required")
	@FutureOrPresent(message = "startDate cannot be in the past")
	private LocalDate startDate;

	@JsonProperty("end_date")
	@NotNull(message = "endDate is required")
	@Future(message = "endDate must be in the future")
	private LocalDate endDate;
	
	 
	@JsonProperty("no_of_guests")
	@NotNull(message = "noOfGuests is required")
	@Min(value = 1, message = "noOfGuests must be at least 1")
	private Integer noOfGuests;

	@JsonProperty("food_item_ids")
	// only ids are sent from the client; server looks up FoodItem entities and prices
	private List<Long> foodItemIds;

	// sent only when actually confirming a booking (after Razorpay checkout succeeds),
	// not when just asking for a create-order quote
	@JsonProperty("razorpay_order_id")
	private String razorpayOrderId;

	@JsonProperty("razorpay_payment_id")
	private String razorpayPaymentId;

	@JsonProperty("razorpay_signature")
	private String razorpaySignature;

 
}