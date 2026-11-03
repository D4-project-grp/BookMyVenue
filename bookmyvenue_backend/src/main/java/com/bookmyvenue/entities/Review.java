package com.bookmyvenue.entities;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.annotations.CreationTimestamp;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name="reviews")
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="review_id")
    private Long reviewId;
	
	@Column(length = 1000)
	private String note;
	
	private Integer rating;
	
	@OneToOne(fetch=FetchType.LAZY)// one review is associated with one reservation
	@JoinColumn(
			name="booking_id",
			unique=true
			)
	private Booking booking;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="venue_id")
	private Venue venue;
	@OneToMany(mappedBy="review",cascade=CascadeType.ALL,fetch=FetchType.EAGER,
			orphanRemoval=true)
	private List<ReviewImage> images;
	
	
	@CreationTimestamp
	@Column(name="created_on")
	private LocalDateTime createdAt;
}