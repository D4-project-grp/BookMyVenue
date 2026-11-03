package com.bookmyvenue.dto;

import com.bookmyvenue.entities.PackageStatus;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionPackageResponse {
    private Long  packageId;

    private String packageName;

    private String description;

    private BigDecimal subscriptionAmount;

    private Integer validityDays;

    private BigDecimal bookingDiscountPercentage;

    private PackageStatus status ;
}
