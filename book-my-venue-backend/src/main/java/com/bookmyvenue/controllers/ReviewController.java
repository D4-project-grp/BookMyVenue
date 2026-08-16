package com.bookmyvenue.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.dto.ReviewResponse;
import com.bookmyvenue.security.SecurityConfiguration;
import com.bookmyvenue.services.ReviewService;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;
import lombok.RequiredArgsConstructor;
import utils.PrincipleUtils;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

     

    private final ReviewService reviewService;
  

    
    @GetMapping("/{venueId}")
    public ResponseEntity<?> getAllReviewsByVenueId(@PathVariable Long venueId){
    	 
    	List<ReviewResponse> resp=reviewService.getAllReviewsByVenueId(venueId);
    	return ResponseEntity.ok(new ApiResponse<List<ReviewResponse>>(true, null, resp, LocalDateTime.now()));
    	 
    	
    }
}