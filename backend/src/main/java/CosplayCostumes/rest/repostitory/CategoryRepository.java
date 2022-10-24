package CosplayCostumes.rest.repostitory;

import CosplayCostumes.rest.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findById(Long id);

    Optional<Category> findByCode(String code);

}
