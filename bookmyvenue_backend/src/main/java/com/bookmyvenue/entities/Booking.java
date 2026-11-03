package com.bookmyvenue.entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
 
@Entity
@Table(name = "bookings")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "booking_id")
	private Long bookingId;

	@Enumerated(EnumType.STRING)
	private BookingStatus status = BookingStatus.PENDING;
	
	@Enumerated(EnumType.STRING)
	private EventType eventType = EventType.OTHER;
	
	@Column(name = "start_datetime")
	private LocalDate startDate;

	@Column(name = "end_datetime")
	private LocalDate endDate;

	@Column(name = "booked_at")
	private LocalDateTime bookedAt;

	
	
	private BigDecimal cost;

	@Column(name = "no_of_guests")
	private Integer noOfGuests;

	@ManyToOne(fetch=FetchType.EAGER) // many bookings can belongs to one venue but at different times
	@JoinColumn(name = "venue_id")
	private Venue venue;

	@ManyToOne(fetch=FetchType.EAGER) // many bookings can be booked by a single user(customer)
	@JoinColumn(name = "customer_id")
	private User customer;

	

	@OneToMany(mappedBy = "booking",fetch=FetchType.LAZY,cascade = CascadeType.ALL)
	private List<BookedFoodItem> bookedFoodItems;

	@OneToOne(mappedBy = "booking",fetch=FetchType.EAGER)//only review can be associated with single reservation
	private Review review;

	@OneToOne(mappedBy = "booking",fetch=FetchType.EAGER)
	private Payment payment;//only one transaction can be associated with single booking
}
