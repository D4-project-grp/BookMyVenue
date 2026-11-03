package com.bookmyvenue.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "venue_subscriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name="id",column=@Column(name="Id"))
public class VenueSubscription extends BaseEntity {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    private SubscriptionPackage subscriptionPackage;


    @Column(nullable = false)
    private LocalDate startDate;


    @Column(nullable = false)
    private LocalDate endDate;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SubscriptionStatus status;



}