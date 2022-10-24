package CosplayCostumes.rest.repostitory;

import CosplayCostumes.rest.model.Opinion;
import CosplayCostumes.rest.model.Product;
import CosplayCostumes.security.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    Optional<Opinion> findById(Long id);

    @Query("SELECT o FROM Opinion o WHERE o.user = :user and o.product = :product")
    Optional<Opinion> findOpinionByUserAndProduct(
            @Param("user") User user,
            @Param("product") Product product);
}
