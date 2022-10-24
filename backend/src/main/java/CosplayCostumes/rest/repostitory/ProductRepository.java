package CosplayCostumes.rest.repostitory;

import CosplayCostumes.rest.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(Long id);
    Optional<Product> findByBusinessKey(String businessKey);
}
