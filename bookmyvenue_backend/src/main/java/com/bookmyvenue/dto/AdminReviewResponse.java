package com.bookmyvenue.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminReviewResponse {
    private Long reviewId;
    private String venueName;
    private String customerName;
    private Integer rating;
    private String note;
    private LocalDateTime createdOn;
}