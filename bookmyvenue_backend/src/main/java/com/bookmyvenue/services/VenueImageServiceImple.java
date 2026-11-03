package com.bookmyvenue.services;

import com.bookmyvenue.entities.VenueImage;
import com.bookmyvenue.repository.VenueImageRepository;
import com.bookmyvenue.repository.VenueRepository;
import io.swagger.v3.oas.annotations.servers.Server;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class VenueImageServiceImple implements VenueImageService{

    private final VenueRepository venueRepository;
    final private VenueImageRepository venueImageRepository;

     
    @Override
    public void addImage(VenueImage img) {

        venueImageRepository.save(img);
    }
	@Override
	public List<String> getAllImagesByVenueId(Long venueId) {
		 
		return venueImageRepository.findByVenueId(venueId).stream().map((venue_image)->"http://localhost:2003/uploads/"+venue_image.getImgUrl()).toList();
	}
}
