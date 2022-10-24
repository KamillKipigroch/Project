package CosplayCostumes.rest.repostitory;

import CosplayCostumes.rest.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductTypeRepository extends JpaRepository<ProductType, Long> {
    Optional<ProductType> findById(Long id);

    Optional<ProductType> findByCode(String code);

}
