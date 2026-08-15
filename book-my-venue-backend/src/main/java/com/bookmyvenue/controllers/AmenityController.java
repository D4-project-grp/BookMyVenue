package com.bookmyvenue.controllers;

import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.entities.Amenity;
import com.bookmyvenue.services.AmenityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/amenity")
public class AmenityController {
    final private AmenityService amenityService;
    @GetMapping("")
    public ResponseEntity<?> getAllAmenities(){
        List<Amenity> list = amenityService.getAllAmenities();
        return ResponseEntity.ok().body(new ApiResponse<List<Amenity>>(true,null,list, LocalDateTime.now()));
    }

    @PostMapping("")
    public ResponseEntity<?>  addAmenity(@RequestParam String amenity){
        String msg=amenityService.addAmentiy(amenity);
        return  ResponseEntity.ok().body(new ApiResponse<String>(true,msg,null,LocalDateTime.now()));
    }

}
