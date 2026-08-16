package com.bookmyvenue.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
 
@Entity
@Table(name="menus")
@AttributeOverride(name="id",column=@Column(name="menu_id"))
public class Menu extends BaseEntity{
//	@Column(name="menu_name",length=150)
//    private String menuName;
	
	@Column(name="menu_type")
	@Enumerated(EnumType.STRING)
	private MenuType menuType;
	
	@ManyToOne(fetch=FetchType.EAGER) //many menus can belong to one venue
	@JoinColumn(name="venue_id")
	private Venue venue;
	
	@OneToMany(mappedBy="menu",cascade=CascadeType.ALL,fetch=FetchType.LAZY,
			orphanRemoval=true)
	private List<FoodItem> foodItems=new ArrayList<>();
	
}
