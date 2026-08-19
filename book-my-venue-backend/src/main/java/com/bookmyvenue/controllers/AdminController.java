package com.bookmyvenue.controllers;

import com.bookmyvenue.dto.AdminDashboardResponse;
import com.bookmyvenue.dto.AdminReviewResponse;
import com.bookmyvenue.dto.AdminVenueResponse;
import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.dto.BookingResponse;
import com.bookmyvenue.entities.BookingStatus;
import com.bookmyvenue.entities.UserRole;
import com.bookmyvenue.entities.VenueStatus;
import com.bookmyvenue.repository.BookingRepository;
import com.bookmyvenue.repository.UserRepository;
import com.bookmyvenue.repository.VenueRepository;
import com.bookmyvenue.services.BookingService;
import com.bookmyvenue.services.ReviewService;
import com.bookmyvenue.services.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {
    private final VenueService venueService;
    private final BookingService bookingService;
    private final ReviewService reviewService;

    // used only for the dashboard stats below - just simple counts, doesn't
    // really belong to any one service since it spans users/venues/bookings
    private final UserRepository userRepository;
    private final VenueRepository venueRepository;
    private final BookingRepository bookingRepository;

    // venues waiting for admin's approval
    @GetMapping("/venues/pending")
    public ResponseEntity<?> getPendingVenues(){
        List<AdminVenueResponse> venues = venueService.getVenuesByStatus(VenueStatus.PENDING);
        return ResponseEntity.ok(new ApiResponse<List<AdminVenueResponse>>(true, null, venues, LocalDateTime.now()));
    }

    // venues already approved
    @GetMapping("/venues/approved")
    public ResponseEntity<?> getApprovedVenues(){
        List<AdminVenueResponse> venues = venueService.getVenuesByStatus(VenueStatus.APPROVED);
        return ResponseEntity.ok(new ApiResponse<List<AdminVenueResponse>>(true, null, venues, LocalDateTime.now()));
    }

    @PatchMapping("/venues/{venueId}/approve")
    public ResponseEntity<?> approveVenue(@PathVariable Long venueId){
        venueService.approveVenue(venueId);
        return ResponseEntity.ok(new ApiResponse<String>(true, "Venue approved successfully", null, LocalDateTime.now()));
    }

    @PatchMapping("/venues/{venueId}/reject")
    public ResponseEntity<?> rejectVenue(@PathVariable Long venueId){
        venueService.rejectVenue(venueId);
        return ResponseEntity.ok(new ApiResponse<String>(true, "Venue rejected successfully", null, LocalDateTime.now()));
    }

    // ---- Dashboard ----
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStats(){
        AdminDashboardResponse stats = new AdminDashboardResponse();

        stats.setTotalUsers(userRepository.count());
        stats.setTotalCustomers(userRepository.countByRole(UserRole.CUSTOMER));
        stats.setTotalVenueOwners(userRepository.countByRole(UserRole.VENUE_OWNER));

        stats.setTotalVenues(venueRepository.count());
        stats.setApprovedVenues(venueRepository.countByStatus(VenueStatus.APPROVED));
        stats.setPendingVenues(venueRepository.countByStatus(VenueStatus.PENDING));
        stats.setRejectedVenues(venueRepository.countByStatus(VenueStatus.REJECTED));

        stats.setTotalBookings(bookingRepository.count());
        stats.setConfirmedBookings(bookingRepository.countByStatus(BookingStatus.CONFIRMED));
        stats.setCancelledBookings(bookingRepository.countByStatus(BookingStatus.CANCELLED));

        Double revenue = bookingRepository.sumRevenue();
        stats.setRevenue(revenue == null ? 0 : revenue);

        return ResponseEntity.ok(new ApiResponse<AdminDashboardResponse>(true, null, stats, LocalDateTime.now()));
    }

    // ---- Bookings ----
    @GetMapping("/bookings")
    public ResponseEntity<?> getAllBookings(){
        List<BookingResponse> bookings = bookingService.getAllBookingsForAdmin();
        return ResponseEntity.ok(new ApiResponse<List<BookingResponse>>(true, null, bookings, LocalDateTime.now()));
    }

    // ---- Reviews ----
    @GetMapping("/reviews")
    public ResponseEntity<?> getAllReviews(){
        List<AdminReviewResponse> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(new ApiResponse<List<AdminReviewResponse>>(true, null, reviews, LocalDateTime.now()));
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId){
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok(new ApiResponse<String>(true, "Review deleted successfully", null, LocalDateTime.now()));
    }
}