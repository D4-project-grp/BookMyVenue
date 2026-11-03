package com.bookmyvenue.controllers;

import com.bookmyvenue.dto.*;
import com.bookmyvenue.security.CustomUserDetailsImpl;
import com.bookmyvenue.services.UserService;
import com.bookmyvenue.services.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {
    final private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@ModelAttribute SignupRequest request,
                                    @RequestParam MultipartFile profileImage) throws IOException {
        String msg = userService.registerUser(request, profileImage);

        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<String>(true, msg, null, LocalDateTime.now()));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SigninRequest request) {
        SigninResponse res = userService.authenticate(request);
        return ResponseEntity.ok().body(new ApiResponse<SigninResponse>(true, null, res, LocalDateTime.now()));
    }

    
    

}
