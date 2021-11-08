package seoul42.openproject.selectfood.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seoul42.openproject.selectfood.advice.exception.CFoodNotFoundException;
import seoul42.openproject.selectfood.advice.exception.CUserNotFoundException;
import seoul42.openproject.selectfood.domain.Food;
import seoul42.openproject.selectfood.domain.Member;
import seoul42.openproject.selectfood.domain.SelectedFood;
import seoul42.openproject.selectfood.dto.calendar.CalendarDayFoodDto;
import seoul42.openproject.selectfood.repository.FoodRepository;
import seoul42.openproject.selectfood.repository.MemberRepository;
import seoul42.openproject.selectfood.repository.SelectedFoodRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class CalendarService {

    private final SelectedFoodRepository selectedFoodRepository;
    private final MemberRepository memberRepository;
    private final FoodRepository foodRepository;


    public List<CalendarDayFoodDto> getSelectedFoodInMonth(String email, String date) {
        LocalDate startDate = LocalDate.parse(date);
        LocalDate endDate = startDate.plusMonths(1).minusDays(1);
        List<CalendarDayFoodDto> foodNames = new ArrayList<>();
        Long memberId = memberRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new).getId();
        List<SelectedFood> selectedFoodsInMonth = selectedFoodRepository.findAllByMemberIdAndSelectDateBetweenOrderBySelectDate(memberId, startDate, endDate);
        for (SelectedFood selectedFood:
             selectedFoodsInMonth) {
            foodNames.add(new CalendarDayFoodDto(selectedFood.getFood().getName(), selectedFood.getSelectDate().toString()));
        }
        return foodNames;
    }

    @Transactional
    public void saveSelectedFoodWithDate(String email, String foodName, String date) {
        Member member = memberRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
        Food food = foodRepository.findByName(foodName).orElseThrow(CFoodNotFoundException::new);
        member.addSelectedFood(new SelectedFood(member, food, LocalDate.parse(date)));
        memberRepository.save(member);
    }

    @Transactional
    public void deleteSelectedFood(String email, String foodName, String inDate) {
        Member member = memberRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
        Food food = foodRepository.findByName(foodName).orElseThrow(CFoodNotFoundException::new);
        if (member.hasSelectedFood(food.getId(), LocalDate.parse(inDate))) {
            member.getSelectedFoods().removeIf(food1 -> food1.getFood().getName().equals(foodName) &&
                    food1.getSelectDate().equals(LocalDate.parse(inDate)));
            selectedFoodRepository.deleteByMemberIdAndFoodIdAndSelectDate(member.getId(), food.getId(), LocalDate.parse(inDate));
        }
        memberRepository.save(member);
    }

    @Transactional
    public void saveSelectedFoods(String email, List<String> foodNames, String inDate) {
        LocalDate localDate = LocalDate.parse(inDate);
        Member member = memberRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
        for (String foodName :
                foodNames) {
            Food food = foodRepository.findByName(foodName).orElseThrow(CFoodNotFoundException::new);
            member.addSelectedFood(new SelectedFood(member, food, localDate));
        }
        memberRepository.save(member);
    }

    @Transactional
    public void deleteSelectedFoods(String email, List<String> foodNames, String inDate) {
        Member member = memberRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
        for (String foodName:
                foodNames) {
            Food food = foodRepository.findByName(foodName).orElseThrow(CFoodNotFoundException::new);
            if (member.hasSelectedFood(food.getId(), LocalDate.parse(inDate))) {
                member.getSelectedFoods().removeIf(food1 -> food1.getFood().getName().equals(foodName) &&
                        food1.getSelectDate().equals(LocalDate.parse(inDate)));
                selectedFoodRepository.deleteByMemberIdAndFoodIdAndSelectDate(member.getId(), food.getId(), LocalDate.parse(inDate));
            }
        }
        memberRepository.save(member);
    }

    public List<CalendarDayFoodDto> getAllSelectedFoods(String email) {
        List<CalendarDayFoodDto> foodNames = new ArrayList<>();
        List<SelectedFood> selectedFoods = memberRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new).getSelectedFoods();
        for (SelectedFood selectedFood :
                selectedFoods) {
            foodNames.add(new CalendarDayFoodDto(selectedFood.getFood().getName(), selectedFood.getSelectDate().toString()));
        }
        return foodNames;
    }
}
