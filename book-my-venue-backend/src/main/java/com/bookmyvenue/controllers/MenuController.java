package com.bookmyvenue.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.dto.MenuResponse;
import com.bookmyvenue.services.MenuService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menus")
public class MenuController {
   final private MenuService menuService;
   
   @GetMapping("/{venueId}")
   public ResponseEntity<?> getAllMenusByVenueId(@PathVariable Long venueId){
	   List<MenuResponse> resp=menuService.getAllMenuesByVenueId(venueId);
	   return ResponseEntity.ok(new ApiResponse<List<MenuResponse>>(true,null,resp,LocalDateTime.now()));
   }
}
