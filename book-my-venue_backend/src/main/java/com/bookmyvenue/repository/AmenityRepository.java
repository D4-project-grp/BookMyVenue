package com.bookmyvenue.repository;

import com.bookmyvenue.entities.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmenityRepository extends JpaRepository<Amenity,Long> {
}
