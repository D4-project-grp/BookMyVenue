package com.bookmyvenue.repository;

import com.bookmyvenue.entities.PackageStatus;
import com.bookmyvenue.entities.SubscriptionPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubscriptionRepository extends JpaRepository<SubscriptionPackage,Long> {
    List<SubscriptionPackage> findByStatus(PackageStatus status);
}
