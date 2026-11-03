package com.bookmyvenue.repository;

import com.bookmyvenue.entities.VenueSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueSubscriptionRepository extends JpaRepository<VenueSubscription,Long> {
}
