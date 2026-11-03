package com.bookmyvenue.services;

import com.bookmyvenue.dto.FoodCategoryDto;
import com.bookmyvenue.dto.FoodItemDto;
import com.bookmyvenue.dto.MenuResponse;
import com.bookmyvenue.entities.*;
import com.bookmyvenue.enums.UploadFolder;
import com.bookmyvenue.repository.FoodItemRepository;
import com.bookmyvenue.repository.MenuRepository;
import com.bookmyvenue.repository.VenueRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService{
    final private MenuRepository menuRepository;
    final private FoodItemRepository foodItemRepository;
    final private VenueRepository venueRepository;
    final private FileStorageService fileStorageService;
    final private ModelMapper mapper;
    @Override
    public void addMenu(Long venueId, List<FoodCategoryDto> foodMenu, Map<String, MultipartFile> allParts) {


        foodMenu.forEach((foodCategoryDto -> {
            System.out.println(foodCategoryDto.getCategory());
            Menu menu=new Menu();
            Venue venue=venueRepository.findById(venueId).get();
            menu.setVenue(venue);
            String menuType=foodCategoryDto.getCategory().toUpperCase()
                    .replace(" ", "_");
            MenuType type =MenuType.valueOf(menuType);
            menu.setMenuType(type);
            List<FoodItem> foodItemList=new ArrayList<>();


            List<FoodItemDto> foodItem=foodCategoryDto.getItems();
            foodItem.forEach((item)->{
                String img_url= item.getImageKey();
                MultipartFile image =
                        allParts.get(item.getImageKey());
                try {
                    img_url = fileStorageService.saveImage(image, UploadFolder.FOOD_ITEMS.getFolderName());

                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                FoodItem f=new FoodItem(item.getName(), FoodType.VEG,item.getDescription(),item.getPrice(),img_url);
                f.setMenu(menu);
                foodItemList.add(f);



            });
            menu.setFoodItems(foodItemList);
            menuRepository.save(menu);
        }));

    }
	@Override
	public List<MenuResponse> getAllMenuesByVenueId(Long venueId) {
		Venue venue=venueRepository.findById(venueId).get();
		List<MenuResponse> response=new ArrayList<>();
		
		List<Menu> menus=menuRepository.findByVenue(venue);
		menus.forEach((menu)->{
		      MenuResponse m=mapper.map(menu,MenuResponse.class);
		      response.add(m);
		      m.getItems().forEach((foodItem)->{
		    	  foodItem.setImgUrl("http://localhost:2003/uploads/"+foodItem.getImgUrl());
		      });
		});
	
		response.forEach((foodResponse)->System.out.println(foodResponse));
		return response;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
