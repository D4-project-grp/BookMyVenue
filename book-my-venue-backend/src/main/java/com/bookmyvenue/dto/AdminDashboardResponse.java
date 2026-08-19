package com.bookmyvenue.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {
    private long totalUsers;
    private long totalCustomers;
    private long totalVenueOwners;

    private long totalVenues;
    private long approvedVenues;
    private long pendingVenues;
    private long rejectedVenues;

    private long totalBookings;
    private long confirmedBookings;
    private long cancelledBookings;

    private double revenue;
}