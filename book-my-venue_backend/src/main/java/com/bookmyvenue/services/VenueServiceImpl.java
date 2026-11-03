package com.bookmyvenue.services;

 
import com.bookmyvenue.dto.*;
import com.bookmyvenue.entities.*;
import com.bookmyvenue.enums.UploadFolder;
import com.bookmyvenue.repository.SubscriptionRepository;
import com.bookmyvenue.repository.UserRepository;
import com.bookmyvenue.repository.VenueRepository;
import jakarta.transaction.Transactional;
 
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
 
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import utils.PrincipleUtils;

import java.io.IOException;
import java.sql.ClientInfoStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
 


@Service
@Transactional
@RequiredArgsConstructor

public class VenueServiceImpl implements VenueService{
    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final VenueSubscriptionService venueSubscriptionService;
    private final FileStorageService fileStorageService;
    private final ModelMapper mapper;
    private final VenueImageService venueImageService;
    private final AmenityService amenityService;
    private final SubscriptionRepository subscriptionRepository;
    
    @Override
    public Long addVenue(AddVenueRequest addVenueRequest, List<MultipartFile> venueImages) {



        Long userId=(Long)  PrincipleUtils.getPrincipal();

//        1.get User object from db;
        User usr=userRepository.findById(userId).get();
        Venue venue = mapper.map(addVenueRequest, Venue.class);

        venue.setId(null);
        venue.setOwner(usr);
//        2. creating list of Amenity ,creating and adding objects of Amenity , initialize amenities property of Venue class
        Set<Amenity> list = new HashSet<>();

        addVenueRequest.getAmenityIds().forEach((amenityId)->{
            list.add(amenityService.getAmenityById(amenityId));
        });
        venue.setAmenities(list);
//      3. making trasient entity ->persistent
        venue = venueRepository.save(venue);

        Venue venueCopy=venue;
//      4.saving images's path to VenueImage table
        venueImages.forEach((image)->{
            try {
                String imagePath = fileStorageService.saveImage(
                        image,
                        UploadFolder.VENUES.getFolderName()
                );
                VenueImage img=new VenueImage();
                img.setVenue(venueCopy);
                img.setImgUrl(imagePath);
                venueImageService.addImage(img);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        SubscriptionPackage subscriptionPackage=subscriptionRepository.findById(addVenueRequest.getPackageId()).get();
        LocalDate startDate = LocalDate.now();

        LocalDate expiryDate = startDate.plusDays(
                subscriptionPackage.getValidityDays()
        );
//       5.setting object of selected Subscription package
        VenueSubscription venueSubscription=new VenueSubscription(venue,subscriptionPackage,startDate,expiryDate, SubscriptionStatus.ACTIVE);
        venueSubscription.setVenue(venue);
        venueSubscriptionService.add(venueSubscription);


//        return new ApiResponse<Integer>(true,"hi",12, LocalDateTime.now());
          return venue.getId();
    }

    
    @Override
    public List<VenueCardResponse> getAllVenues() {
        List<Venue> venues = venueRepository.findAll();

        List<VenueCardResponse> list = new ArrayList<>();
        venues.forEach((venue) -> {
            VenueCardResponse cardResponse = new VenueCardResponse();
            cardResponse.setVenueId(venue.getId());
            cardResponse.setVenueName(venue.getVenueName());
            cardResponse.setCity(venue.getAddress().getCity());
            cardResponse.setLocality(venue.getAddress().getLocality());
            cardResponse.setPrice(venue.getPrice());
            cardResponse.setStatus(venue.getStatus());
            cardResponse.setGuestCapacity(venue.getGuestCapacity());

            String img_url = venue.getImages().get(0).getImgUrl();
            if (img_url != null) {
                img_url = "http://localhost:2003/uploads/" + img_url;
            }
            cardResponse.setImg_url(img_url);

            list.add(cardResponse);


        });
        return list;
    }

    // used by Customer-facing pages (Home, Search) - only APPROVED venues,
    // so customers never see still-pending or rejected listings
    @Override
    public List<VenueCardResponse> getApprovedVenues() {
        List<Venue> venues = venueRepository.findByStatus(VenueStatus.APPROVED);
        
        List<VenueCardResponse> list = new ArrayList<>();
        venues.forEach((venue) -> {
            VenueCardResponse cardResponse = new VenueCardResponse();
            cardResponse.setVenueId(venue.getId());
            cardResponse.setVenueName(venue.getVenueName());
            cardResponse.setCity(venue.getAddress().getCity());
            cardResponse.setLocality(venue.getAddress().getLocality());
            cardResponse.setPrice(venue.getPrice());
            cardResponse.setStatus(venue.getStatus());
            cardResponse.setGuestCapacity(venue.getGuestCapacity());

            // guard against a venue with no images yet, unlike getAllVenues() above
            // which crashes the whole list if even one venue has zero images
            String img_url = null;
            if (!venue.getImages().isEmpty()) {
                img_url = "http://localhost:2003/uploads/" + venue.getImages().get(0).getImgUrl();
            }
            cardResponse.setImg_url(img_url);

            list.add(cardResponse);
        });
        return list;
    }
    
	@Override
	public  VenueCustomerResponse  getVenueById(Long venueId) {
		Venue  venue=venueRepository.findById(venueId).get();
		VenueCustomerResponse venueResponse=mapper.map(venue, VenueCustomerResponse.class);
		List<String> amenities=venue.getAmenities().stream().map((amenity)->amenity.getAmenityName()).toList();
        venueResponse.setAmenities(amenities);
        List<String> venue_images=venueImageService.getAllImagesByVenueId(venueId);
        venueResponse.setVenue_images(venue_images);
		 
		return venueResponse;
	}
	
 

 
}