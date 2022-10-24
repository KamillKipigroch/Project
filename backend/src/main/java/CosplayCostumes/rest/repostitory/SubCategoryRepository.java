package CosplayCostumes.rest.repostitory;

import CosplayCostumes.rest.model.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubCategoryRepository extends JpaRepository<Subcategory, Long> {
    Optional<Subcategory> findById(Long id);

    Optional<Subcategory> findByCode(String code);
}
