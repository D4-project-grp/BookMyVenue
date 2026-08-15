package com.bookmyvenue.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.dto.BookingResponse;
import com.bookmyvenue.dto.CreateBookingRequest;
 
import com.bookmyvenue.services.BookingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import utils.PrincipleUtils;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

	private final BookingService bookingService;
	
	@PostMapping("/create-order")
	public ResponseEntity<?> createOrder(@RequestBody CreateBookingRequest request) {
		com.bookmyvenue.dto.CreateOrderResponse orderResponse = bookingService.createOrder(request);
		return ResponseEntity.ok().body(new ApiResponse<com.bookmyvenue.dto.CreateOrderResponse>(true, null, orderResponse, LocalDateTime.now()));
	}

	@PostMapping("")
	public ResponseEntity<?> createBooking(
			@Valid @RequestBody CreateBookingRequest request) {

		Long userId=(Long) PrincipleUtils.getPrincipal();
		BookingResponse response = bookingService.createBooking(request,userId);
//		return ResponseEntity.status(HttpStatus.CREATED).body(response);
		return ResponseEntity.ok().body(new ApiResponse<BookingResponse>(true,"Hi",response,LocalDateTime.now()));
	}
	@GetMapping("/customer/current")
	public ResponseEntity<?> getCurrentBookingsForCustomer(){
		 
		List<BookingResponse> resp=bookingService.getCurrentBookingsForCustomer();
		
		return ResponseEntity.ok().body(new ApiResponse<List<BookingResponse>>(true,null,resp,LocalDateTime.now()));
	}
	@GetMapping("/customer/history")
	public ResponseEntity<?> getOldBookingsForCustomer(){
		 
		List<BookingResponse> resp=bookingService.getOldBookingsForCustomer();
		
		return ResponseEntity.ok().body(new ApiResponse<List<BookingResponse>>(true,null,resp,LocalDateTime.now()));
	}

	// ---- Owner-side ----
	@GetMapping("/owner/current")
	public ResponseEntity<?> getCurrentBookingsForOwner(){

		List<BookingResponse> resp=bookingService.getCurrentBookingsForOwner();

		return ResponseEntity.ok().body(new ApiResponse<List<BookingResponse>>(true,null,resp,LocalDateTime.now()));
	}
	@GetMapping("/owner/history")
	public ResponseEntity<?> getOldBookingsForOwner(){

		List<BookingResponse> resp=bookingService.getOldBookingsForOwner();

		return ResponseEntity.ok().body(new ApiResponse<List<BookingResponse>>(true,null,resp,LocalDateTime.now()));
	}
	 
}