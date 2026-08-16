package com.bookmyvenue.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class Address {
    @Column(length=150)
    private String street;
    
    @Column(length=150)
    private String locality;
    
    @Column(length=100)
    private String city;
    
    private Integer pincode;
}