package CosplayCostumes.app.repostitory;

import CosplayCostumes.app.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    Optional<ProductImage> findById(Long id);
    Optional<ProductImage> findByCode (String code);
}
