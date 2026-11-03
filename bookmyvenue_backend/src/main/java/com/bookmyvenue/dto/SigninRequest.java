package com.bookmyvenue.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class SigninRequest {
    private String email;
    private String password;
}
