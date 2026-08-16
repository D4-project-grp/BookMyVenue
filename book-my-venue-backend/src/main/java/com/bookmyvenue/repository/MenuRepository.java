package com.bookmyvenue.repository;

import com.bookmyvenue.entities.Menu;
import com.bookmyvenue.entities.Venue;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {

	 

 

	List<Menu> findByVenue(Venue venueId);
}
