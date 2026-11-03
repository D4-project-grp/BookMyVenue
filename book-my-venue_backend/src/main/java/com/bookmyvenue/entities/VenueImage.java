package com.bookmyvenue.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="venue_images")
public class VenueImage {
	 @Id
	 @GeneratedValue(strategy=GenerationType.IDENTITY)
	 @Column(name="img_id")
     private Long imgId;
     
	 
	 @Column(name="img_url",length=255)
     private String imgUrl;
     
	 @ManyToOne(fetch=FetchType.LAZY)
	 @JoinColumn(name="venue_id")
     private Venue venue;
     
	 @Column(name="created_at")
	 @CreationTimestamp
     private LocalDateTime createdAt;


}
