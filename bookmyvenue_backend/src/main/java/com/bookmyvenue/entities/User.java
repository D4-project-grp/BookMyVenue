package com.bookmyvenue.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
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
@Table(name="users")
@AttributeOverride(name="id" ,column=@Column(name="user_id"))
public class User extends BaseEntity{
   
   @Column(name="first_name",length=100)
   private String firstName;
   
   @Column(name="last_name",length=100)
   private String lastName;
   
   @Column(length=254,nullable=false,unique=true)
   private String email;
   
   @Column(length=255)
   private String password;
   
   @Column(length=15)
   private String mobileNo;
   
   @Enumerated(EnumType.STRING)
   private UserRole role;
 
   
   @Column(length=255)
   private String profileImg;
   
   @Enumerated(EnumType.STRING)
   private UserStatus status;
   
   @Embedded
   private Address address;
   @JsonIgnore
   @OneToMany(mappedBy="owner",fetch=FetchType.LAZY)// one venue owner can have multiple hostings(venues)
   private List<Venue> venues=new ArrayList<>();
   @JsonIgnore
   @OneToMany(mappedBy="customer",fetch=FetchType.LAZY)// one venue owner can have multiple bookings on his venues
   private List<Booking> bookings=new ArrayList<>();
   
}
