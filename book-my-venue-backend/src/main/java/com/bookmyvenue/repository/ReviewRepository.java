package com.bookmyvenue.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookmyvenue.entities.Review;
 

public interface ReviewRepository extends JpaRepository<Review, Long>{

	boolean existsByBooking_BookingId(Long bookingId);
	
    @Query("SELECT r FROM Review r WHERE r.venue.id=:venueId")
	List<Review>  findByVenueId(@Param(value = "venueId") Long venueId);

}
