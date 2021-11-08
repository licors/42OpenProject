package seoul42.openproject.selectfood.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seoul42.openproject.selectfood.advice.exception.CFoodNotFoundException;
import seoul42.openproject.selectfood.domain.Food;
import seoul42.openproject.selectfood.repository.FoodRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// service 에서는 비지니스 로직에 가까운 용어 선택
// 서비스는 주로 비지니스 로직 처리
@Service
@Transactional(readOnly = true)
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    @Transactional
    public Long save(Food food) {
        // optional 에서 orElseGet() 이 많이 쓰임(있으면 리턴 없으면 뒤에 메소드 실행)
        validateDuplicateFood(food);
        foodRepository.save(food);
        return food.getId();
    }

    private void validateDuplicateFood(Food food) {
        foodRepository.findByName(food.getName())
                // isPresent() 와 혼동 주의
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 음식입니다.");
                });
    }

    public List<Food> findAllFood() {
        return foodRepository.findAll();
    }

    public Optional<Food> findOne(Long foodId) {
        return foodRepository.findById(foodId);
    }

    public Optional<Food> findByName(String foodName) {
        return foodRepository.findByName(foodName);
    }

    public List<Food> findByNameList(List<String> foodNames) {
        List<Food> foods= new ArrayList<>();
        for (String foodName : foodNames) {
            foods.add(foodRepository.findByName(foodName).orElseGet(Food::new));
        }
        return foods;
    }

    @Transactional
    public void deleteFoodById(Long id) {
        Optional<Food> food = foodRepository.findById(id);
        foodRepository.delete(food.orElseThrow(CFoodNotFoundException::new));
    }
}
