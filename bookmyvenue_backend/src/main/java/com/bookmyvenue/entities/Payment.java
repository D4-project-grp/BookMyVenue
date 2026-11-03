package com.bookmyvenue.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
@Table(name="payments")
public class Payment {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long paymentId;
    
	@Enumerated(EnumType.STRING)
	private PaymentStatus status=PaymentStatus.PENDING;
	
	@OneToOne(fetch=FetchType.EAGER) // one payment is only associated with one reservation
	@JoinColumn(
			name="booking_id",
			unique=true
			)
	private Booking booking;
	
	private Double amount;
	
	@Column(name="payment_method",length=50)
	private String paymentMethod;
	
	@Column(name="transaction_id",length=100)
	private String transactionId;
	
	@CreationTimestamp
	@Column(name="created_at")
	private LocalDateTime createdAt;
}
