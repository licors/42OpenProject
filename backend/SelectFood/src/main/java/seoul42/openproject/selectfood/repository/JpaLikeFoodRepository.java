package seoul42.openproject.selectfood.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import seoul42.openproject.selectfood.domain.Food;
import seoul42.openproject.selectfood.domain.Member;
import seoul42.openproject.selectfood.domain.SelectedFood;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class JpaLikeFoodRepository implements MemberSelectFoodRepository{

    private final EntityManager em;

    @Override
    public void save(Member member, Food food) {
        SelectedFood selectedFood = new SelectedFood();
        selectedFood.setMember(member);
        selectedFood.setFood(food);
        em.persist(selectedFood);
    }

    @Override
    public Optional<SelectedFood> findByMemberId(Long memberId) {
        return Optional.empty();
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        return Optional.empty();
    }

    @Override
    public List<Member> findAll() {
        return null;
    }
}