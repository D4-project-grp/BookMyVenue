package com.bookmyvenue.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AddressRequest {
    private String street;
    private String locality;
    private String city;
    private Integer pincode;
}


