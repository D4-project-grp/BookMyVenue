package com.bookmyvenue.services;

import com.bookmyvenue.dto.SubscriptionPackageResponse;

import java.util.List;

public interface SubscriptionService {
    List<SubscriptionPackageResponse> getAllActiveSubscriptionPackages();
}
