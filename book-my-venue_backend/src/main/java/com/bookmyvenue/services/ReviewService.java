package com.bookmyvenue.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

 

public interface ReviewService {

	 

	List<com.bookmyvenue.dto.ReviewResponse> getAllReviewsByVenueId(Long venueId);

 
 
}