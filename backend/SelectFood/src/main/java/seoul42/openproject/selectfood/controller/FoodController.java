package seoul42.openproject.selectfood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import seoul42.openproject.selectfood.domain.Food;
import seoul42.openproject.selectfood.service.FoodService;

import java.util.List;

@Controller
@RequestMapping("/food")
public class FoodController {

    private final FoodService foodService;

    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping(value = "/new")
    public String createForm() {
        return "foods/createFoodForm";
    }

    @PostMapping(value = "/new")
    public String create(FoodForm form) {

        Food food = new Food();
        food.setName(form.getName());
        food.setTag(form.getTag());
        food.setIngredient(form.getIngredient());
        food.setYoutubeUrl(form.getYoutubeUrl());

        foodService.save(food);

        return "redirect:/food/";
    }

    @GetMapping(value = "/all")
    public String list(Model model) {
        List<Food> food = foodService.findAllFood();
        model.addAttribute("foods", food);
        return "foods/foodList";
    }

    @GetMapping(value = "/delete")
    public String deleteOne(@RequestParam(value = "id") Long id) {
        foodService.deleteFoodById(id);
        return "redirect:/food/all";
    }
}
