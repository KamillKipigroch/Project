package CosplayCostumes.app.repostitory;

import CosplayCostumes.app.model.Product;
import CosplayCostumes.app.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    Optional<ProductImage> findById(Long id);
    Optional<ProductImage> findByCode (String code);

    @Query("SELECT i FROM ProductImage i WHERE i.product = :product")
    Optional<List<ProductImage>> findByProduct(
            @Param("product") Product product);
}
