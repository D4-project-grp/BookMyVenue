package com.bookmyvenue.services;


import com.bookmyvenue.entities.VenueSubscription;
import com.bookmyvenue.repository.VenueSubscriptionRepository;
import jakarta.transaction.Transactional;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class VenueSubscriptionServiceImpl implements VenueSubscriptionService{
    final private VenueSubscriptionRepository venueSubscriptionRepository;

    @Override
    public void add(VenueSubscription venueSubscription) {
        venueSubscriptionRepository.save(venueSubscription);
    }
}
