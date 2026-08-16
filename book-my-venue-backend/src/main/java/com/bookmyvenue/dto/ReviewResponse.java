package com.bookmyvenue.dto;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
	    private String note;

	    private Integer rating;

	    private List<String> images;

	    private String name;

	    private LocalDateTime createdOn;
		 
}
