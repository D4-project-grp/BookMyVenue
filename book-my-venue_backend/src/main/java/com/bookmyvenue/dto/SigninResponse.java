package com.bookmyvenue.dto;

import com.bookmyvenue.entities.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SigninResponse {
       private UserDto user;
       private String accessToken;
}
