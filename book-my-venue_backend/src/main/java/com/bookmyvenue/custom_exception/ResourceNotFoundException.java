package com.bookmyvenue.custom_exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String msg) {
    	super(msg);
    }
}
