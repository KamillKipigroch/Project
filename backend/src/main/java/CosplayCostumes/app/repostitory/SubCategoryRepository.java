package CosplayCostumes.app.repostitory;

import CosplayCostumes.app.model.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubCategoryRepository extends JpaRepository<Subcategory, Long> {
    Optional<Subcategory> findById(Long id);
}