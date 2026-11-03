package com.bookmyvenue.entities;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.hibernate.engine.profile.Fetch;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name="booked_food_items")
public class BookedFoodItem {
	 @Id
	 @GeneratedValue(strategy=GenerationType.IDENTITY)
     private Long id;
     
     @JoinColumn(name="fooditem_id")
     @ManyToOne(fetch = FetchType.EAGER)  //  multiple booking can have same foodItem
     private FoodItem foodItem;
     
     
     private BigDecimal cost;
     
     @ManyToOne(fetch = FetchType.LAZY)
     @JoinColumn(name="booking_id")
     private Booking booking;
}
