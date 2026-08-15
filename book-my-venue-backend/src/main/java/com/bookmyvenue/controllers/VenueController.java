package com.bookmyvenue.controllers;


import com.bookmyvenue.dto.AddVenueRequest;

import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.dto.FoodCategoryDto;
import com.bookmyvenue.dto.UpdateVenueRequest;
import com.bookmyvenue.dto.VenueCardResponse;
import com.bookmyvenue.dto.VenueCustomerResponse;
import com.bookmyvenue.services.BookingService;
import com.bookmyvenue.services.MenuService;
import com.bookmyvenue.services.VenueService;
import lombok.RequiredArgsConstructor;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utils.PrincipleUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import com.bookmyvenue.*;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/venues")
public class VenueController {

    final private VenueService venueService;
    final private MenuService menuService;
    final private BookingService bookingService;


    @PostMapping("")
    public ResponseEntity<?> addVenue(
            @RequestPart("data")  AddVenueRequest request, @RequestPart(value = "venueImages") List<MultipartFile> venueImages, @RequestParam Map<String, MultipartFile> allParts
    ) {


        Long venueId=venueService.addVenue(request,venueImages);
        menuService.addMenu(venueId,request.getFoodMenu(),  allParts);
        return ResponseEntity.ok("Uploaded");
    }
    @GetMapping("/my-listing")
    public ResponseEntity<?> getAllVenuesByOwnerId(){
        Long ownerId= (Long) PrincipleUtils.getPrincipal();
        List<VenueCardResponse> venueCardResponse=venueService.getAllVenuesByUser(ownerId);
        return ResponseEntity.ok(new ApiResponse<List<VenueCardResponse>>(true,null, venueCardResponse, LocalDateTime.now()));
    }

    @GetMapping("")
    public ResponseEntity<?> getAllVenues() {
        List<VenueCardResponse> venueCardResponse = venueService.getAllVenues();
        return ResponseEntity.ok(new ApiResponse<List<VenueCardResponse>>(true, null, venueCardResponse, LocalDateTime.now()));
    }
    // used by Customer-facing pages (Home, Search) - only APPROVED venues
    @GetMapping("/approved")
    public ResponseEntity<?> getApprovedVenues() {
        List<VenueCardResponse> venueCardResponse = venueService.getApprovedVenues();
        return ResponseEntity.ok(new ApiResponse<List<VenueCardResponse>>(true, null, venueCardResponse, LocalDateTime.now()));
    }
    @GetMapping("/{venueId}")
    public ResponseEntity<?> getVenueById(@PathVariable Long venueId){
        // TODO: implement single-venue lookup when needed
    	 VenueCustomerResponse  resp=venueService.getVenueById(venueId);
        return ResponseEntity.ok().body(new ApiResponse<VenueCustomerResponse>(true,null, resp,LocalDateTime.now()));

    }
    @GetMapping("/{venueId}/availability")
	public ResponseEntity<?> checkAvailability(
	        @PathVariable Long venueId,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

	    boolean available = bookingService.isVenueAvailable(venueId, startDate, endDate);
	    Map<String, Object> data = new HashMap<>();
	    data.put("available", available);
	    return ResponseEntity.ok(new ApiResponse<Map<String, Object>>(true, "OK", data,LocalDateTime.now()));
	}

    @DeleteMapping("/{venueId}")
    public ResponseEntity<?> deleteVenue(@PathVariable Long venueId) {
    	Long ownerId = (Long) PrincipleUtils.getPrincipal();
    	venueService.deleteVenue(venueId, ownerId);
    	return ResponseEntity.ok(new ApiResponse<>(true, "Venue deleted successfully", null, LocalDateTime.now()));
    }

    @PutMapping("/{venueId}")
    public ResponseEntity<?> updateVenue(@PathVariable Long venueId, @RequestBody UpdateVenueRequest request) {
    	Long ownerId = (Long) PrincipleUtils.getPrincipal();
    	venueService.updateVenue(venueId, ownerId, request);
    	return ResponseEntity.ok(new ApiResponse<>(true, "Venue updated successfully", null, LocalDateTime.now()));
    }
}