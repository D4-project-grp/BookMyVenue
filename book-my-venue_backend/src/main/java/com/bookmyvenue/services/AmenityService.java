package com.bookmyvenue.services;

import com.bookmyvenue.entities.Amenity;

import java.util.List;


public interface AmenityService {
    List<Amenity> getAllAmenities();

    

    Amenity getAmenityById(Long amenityId);
}
