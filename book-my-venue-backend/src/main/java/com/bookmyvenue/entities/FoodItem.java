package com.bookmyvenue.entities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString(exclude= {"bookedFoodItems","menu"})
@Entity
@Table(name="food_items")
@AttributeOverride(name="id",column=@Column(name="fooditem_id"))
public class FoodItem extends BaseEntity {
	@Column(name="food_name",length=150)
    private String foodName;
    
	@Column(name="food_type",length=50)
	@Enumerated(EnumType.STRING)
    private FoodType foodType;

	@Column(length=1000)
    private String description;
    
    private BigDecimal price;
    
    @ManyToOne(fetch=FetchType.EAGER)//many food items can be associated with one menu 
    @JoinColumn(name="menu_id")
    private Menu menu;

    @Column(name="img_url")
    private String imgUrl;

    @OneToMany(mappedBy="foodItem",fetch=FetchType.LAZY)
    private List<BookedFoodItem> bookedFoodItems=new ArrayList<>();

    public FoodItem(String name, FoodType foodType, String description, BigDecimal price, String imgUrl) {
        this.foodName=name;
        this.foodType=foodType;
        this.description=description;
        this.price=price;
        this.imgUrl=imgUrl;

    }
}
