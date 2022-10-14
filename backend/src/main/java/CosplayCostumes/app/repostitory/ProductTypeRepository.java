package CosplayCostumes.app.repostitory;

import CosplayCostumes.app.model.Category;
import CosplayCostumes.app.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
    Optional<ProductType> findById(Long id);

}
