package com.bookmyvenue.dto;

import com.bookmyvenue.entities.Address;
import com.bookmyvenue.entities.UserRole;
import com.bookmyvenue.entities.UserStatus;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SignupRequest {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String mobileNo;

    private UserRole role;



//    private UserStatus status;

    private AddressResponse address;
}
