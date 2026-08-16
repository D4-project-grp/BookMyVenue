package com.bookmyvenue.repository;

import com.bookmyvenue.entities.VenueImage;
import com.bookmyvenue.services.VenueImageService;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueImageRepository extends JpaRepository<VenueImage,Long> {

	List<VenueImage> findByVenueId(Long venueId);
}
