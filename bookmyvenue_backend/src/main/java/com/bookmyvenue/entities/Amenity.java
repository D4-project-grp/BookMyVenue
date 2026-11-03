package com.bookmyvenue.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
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
@Table(name="amenities")
public class Amenity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="amenity_id")
    private Long amenityId;
	
	@Column(name="amenity_name",unique = true)
	private String amenityName;
	
//	@Column(name="logo_url",length=255)
//	private String logoUrl;

	@ManyToMany(mappedBy="amenities",fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<Venue> venues= new HashSet<>();;

	public Amenity(String amenity) {
		this.amenityName=amenity;
	}
}
