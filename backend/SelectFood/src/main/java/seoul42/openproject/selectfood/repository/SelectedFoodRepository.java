package seoul42.openproject.selectfood.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import seoul42.openproject.selectfood.domain.SelectedFood;

import java.time.LocalDate;
import java.util.List;

public interface SelectedFoodRepository extends JpaRepository<SelectedFood, Long> {

    void deleteByMemberIdAndFoodIdAndSelectDate(Long memberId, Long foodId, LocalDate selectDate);
    List<SelectedFood> findAllByMemberIdAndSelectDateBetweenOrderBySelectDate(Long memberId, LocalDate startDate, LocalDate endDate);
}
