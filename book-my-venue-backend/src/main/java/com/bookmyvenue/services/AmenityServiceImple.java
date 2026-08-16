package com.bookmyvenue.services;

import com.bookmyvenue.entities.Amenity;
import com.bookmyvenue.repository.AmenityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AmenityServiceImple implements AmenityService{
    final private AmenityRepository amenityRepository;
    @Override
    public List<Amenity> getAllAmenities() {
        List<Amenity> list = amenityRepository.findAll();
        return list;
    }

   
    @Override
    public Amenity getAmenityById(Long amenityId) {
        return amenityRepository.findById(amenityId).get();
    }
}
