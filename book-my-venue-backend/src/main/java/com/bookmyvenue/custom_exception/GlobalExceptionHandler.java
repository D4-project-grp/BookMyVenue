package com.bookmyvenue.custom_exception;

import java.time.LocalDateTime;

import com.bookmyvenue.dto.ApiResponse;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.server.ResponseStatusException;


@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handlerResourceNotFoundException(ResourceNotFoundException e){
		 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(false, e.getMessage(),null,LocalDateTime.now()));
	}
    @ExceptionHandler(AuthenticationFailedException.class)
    public ResponseEntity<?> handlerAthenticationFailedException(AuthenticationFailedException e){
    	 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(false ,e.getMessage(),null,LocalDateTime.now()));
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handlerPresentationValidationException(MethodArgumentNotValidException e){
    	 return ResponseEntity.badRequest().body(new ApiResponse( false,e.getAllErrors().getFirst().getDefaultMessage(), null,LocalDateTime.now()));
    }
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<?> handlerResourceAlreadyExistsException(ResourceAlreadyExistsException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ApiResponse( false,e.getMessage(), null,LocalDateTime.now()));

    }
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> handlerResponseStatusException(ResponseStatusException e){
        return ResponseEntity.status(e.getStatusCode()).body(new ApiResponse<String>(false,e.getMessage().substring(15),null,LocalDateTime.now()));
    }
    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<?> handlerMultipartException(MultipartException e){
        String msg="you forgot to upload the images";
        return ResponseEntity.badRequest().body(new ApiResponse<String>(false,msg,null,LocalDateTime.now()));
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handlerIllegalArgumentException(IllegalArgumentException e){
		return ResponseEntity.badRequest().body(new ApiResponse<String>(false,e.getMessage(),null,LocalDateTime.now()));
    	
    }
    
}
