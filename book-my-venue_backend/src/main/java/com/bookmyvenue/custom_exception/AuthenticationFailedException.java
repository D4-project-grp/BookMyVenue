package com.bookmyvenue.custom_exception;

public class AuthenticationFailedException extends RuntimeException{
    public AuthenticationFailedException(String msg){
        super(msg);
    }
}
