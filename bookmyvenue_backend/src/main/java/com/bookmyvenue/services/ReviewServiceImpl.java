package com.bookmyvenue.services;

 
import java.util.ArrayList;
import java.util.List;

 
import org.springframework.stereotype.Service;
 

 
 
import com.bookmyvenue.dto.ReviewResponse;
 
import com.bookmyvenue.entities.Review;
 
 
import com.bookmyvenue.repository.ReviewRepository;
import com.bookmyvenue.repository.VenueRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{
	 
	final private ReviewRepository reviewRepository;
	 
	 
	@Override
	public List<ReviewResponse> getAllReviewsByVenueId(Long venueId) {
		List<Review> reviews=reviewRepository.findByVenueId(venueId);
		List<ReviewResponse> list=new ArrayList<>();
		reviews.forEach((rev)->{
			ReviewResponse revResponse=new ReviewResponse();
			revResponse.setNote(rev.getNote());
			revResponse.setRating(rev.getRating());
			List<String> listOfImages=rev.getImages().stream().map((reviewImage)->"http://localhost:2003/uploads/"+reviewImage.getImgUrl()).toList();
			revResponse.setImages(listOfImages);
			revResponse.setCreatedOn(rev.getCreatedAt());
			revResponse.setName(rev.getBooking().getCustomer().getFirstName());
			list.add(revResponse);
		});
		
		 
		
		 
		return list;
	}

	 

	 
}