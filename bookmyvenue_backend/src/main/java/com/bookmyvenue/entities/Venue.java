package com.bookmyvenue.entities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
 
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@Entity
@Table(name="venues")

@AttributeOverride(name="id",column=@Column(name="venue_id"))
public class Venue extends BaseEntity {
	@Column(name="venue_name",length=150)
    private String venueName;
    @Column(length=1000)
	private String description;
	
	@Column(name="phone_no",length=15)
    private String phoneNo;
    
    private Integer guestCapacity;
    
    private BigDecimal price;
    
    @Embedded
    private Address address;
   
    
    @OneToMany(mappedBy="venue",cascade=CascadeType.ALL,fetch=FetchType.LAZY,
    		orphanRemoval=true)//one venue can have multiple menu like starter , main course
    private List<Menu> menus=new ArrayList<>();;

    @OneToMany(mappedBy="venue",cascade=CascadeType.ALL,fetch=FetchType.LAZY,
    		orphanRemoval=true) // one venue can have multiple images
    private List<VenueImage> images=new ArrayList<>();;

    @OneToMany(mappedBy="venue",fetch=FetchType.LAZY)// one venue can have multiple bookings at different date
    private List<Booking> bookings=new ArrayList<>();;
    
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="owner_id")
    private User owner;
     
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private VenueStatus status=VenueStatus.PENDING;
    
    @JoinTable(
		    joinColumns = @JoinColumn(name = "venue_id"),
		    inverseJoinColumns = @JoinColumn(name = "amenity_id")
	)
    @ManyToMany(fetch=FetchType.LAZY)
	private Set<Amenity> amenities=new HashSet<>();

    @OneToMany(
            mappedBy = "venue",
            cascade = CascadeType.ALL
    )
    private List<VenueSubscription> subscriptions=new ArrayList<>();


}
