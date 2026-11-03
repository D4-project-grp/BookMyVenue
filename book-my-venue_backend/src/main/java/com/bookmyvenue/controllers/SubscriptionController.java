package com.bookmyvenue.controllers;

import com.bookmyvenue.dto.ApiResponse;
import com.bookmyvenue.dto.SubscriptionPackageResponse;
import com.bookmyvenue.entities.BaseEntity;
import com.bookmyvenue.entities.PackageStatus;
import com.bookmyvenue.services.SubscriptionService;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subscription")
public class SubscriptionController {
      final private SubscriptionService subscriptionService;

      @GetMapping("")
      public ResponseEntity<?> getAllActiveSubscriptionPackages(){
          List<SubscriptionPackageResponse> subscriptionPackageResponse=subscriptionService.getAllActiveSubscriptionPackages();
          return ResponseEntity.ok(new ApiResponse<List<SubscriptionPackageResponse>>(true,null,subscriptionPackageResponse,LocalDateTime.now()));

      }

}
