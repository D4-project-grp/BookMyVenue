package com.bookmyvenue.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
 
@MappedSuperclass
public class BaseEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
	@CreationTimestamp
	@Column(name="created_at")
    private LocalDateTime createdAt;
    
	@UpdateTimestamp
	@Column(name="updated_at")
    private  LocalDateTime updatedAt;
	
	@Column(name="deleted_at")//DeletedAt =null , means user exist.
	 //DeletedAt= not null means, record is logically deleted
	 private LocalDateTime deletedAt;
}
