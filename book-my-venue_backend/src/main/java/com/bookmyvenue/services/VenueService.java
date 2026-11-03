package com.bookmyvenue.services;

import com.bookmyvenue.dto.AddVenueRequest;
 
import com.bookmyvenue.dto.ApiResponse;
 
import com.bookmyvenue.dto.VenueCardResponse;
import com.bookmyvenue.dto.VenueCustomerResponse;
import com.bookmyvenue.entities.VenueStatus;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VenueService {
     Long addVenue(AddVenueRequest addVenueRequest, List<MultipartFile> images);

     VenueCustomerResponse getVenueById(Long venueId);
 
     
    List<VenueCardResponse> getAllVenues();

    // used by Customer-facing pages (Home, Search) - only APPROVED venues,
    // unlike getAllVenues() above which returns every venue regardless of status
    List<VenueCardResponse> getApprovedVenues();

   

}