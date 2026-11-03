package com.bookmyvenue.services;

import java.util.List;

import com.bookmyvenue.entities.VenueImage;

public interface VenueImageService {
    void addImage(VenueImage img);

	List<String> getAllImagesByVenueId(Long venueId);
}
