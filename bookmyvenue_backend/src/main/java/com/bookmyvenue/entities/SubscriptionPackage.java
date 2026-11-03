package com.bookmyvenue.entities;

import com.bookmyvenue.entities.PackageStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name = "subscription_packages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id",column=@Column(name="packageId"))
public class SubscriptionPackage extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String packageName;


    @Column(length = 500)
    private String description;


    @Column(nullable = false)
    private BigDecimal subscriptionAmount;


    @Column(nullable = false)
    private Integer validityDays;


    @Column(nullable = false)
    private BigDecimal bookingDiscountPercentage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PackageStatus status = PackageStatus.ACTIVE;

}