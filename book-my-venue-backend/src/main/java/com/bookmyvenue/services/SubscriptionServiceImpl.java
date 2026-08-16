package com.bookmyvenue.services;

import com.bookmyvenue.dto.SubscriptionPackageResponse;
import com.bookmyvenue.entities.PackageStatus;
import com.bookmyvenue.entities.SubscriptionPackage;
import com.bookmyvenue.repository.SubscriptionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService{
    final private SubscriptionRepository subscriptionRepository;
    final private ModelMapper mapper;
    @Override
    public List<SubscriptionPackageResponse> getAllActiveSubscriptionPackages() {
        List<SubscriptionPackage> listOfPackages=subscriptionRepository.findByStatus(PackageStatus.ACTIVE);
        List<SubscriptionPackageResponse> list = listOfPackages.stream().map(e->mapper.map(e,SubscriptionPackageResponse.class))
        .toList();
        return list;
    }
}
