package seoul42.openproject.selectfood.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import seoul42.openproject.selectfood.advice.exception.CFoodNotFoundException;
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
    public String createFoodForm() {
        return "foods/createFoodForm";
    }

    @PostMapping(value = "/new")
    public String createFood(FoodForm form) {

        Food food = new Food();
        food.setName(form.getName());
        food.setTag(form.getTag());
        food.setIngredient(form.getIngredient());
        food.setYoutubeUrl(form.getYoutubeUrl());

        foodService.save(food);

        return "redirect:/food/";
    }

    @GetMapping(value = "/edit")
    public String editForm(Model model, @RequestParam(value = "name") String name) {
        Food food = foodService.findByName(name).orElseThrow(CFoodNotFoundException::new);
        model.addAttribute("food", food);

        return "foods/editFoodForm";
    }

    @PostMapping(value = "/edit")
    public String editFood(FoodForm form) {
        foodService.editFood(form);

        return "redirect:/food/all";
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
