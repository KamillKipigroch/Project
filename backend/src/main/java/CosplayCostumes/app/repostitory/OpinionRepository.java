package CosplayCostumes.app.repostitory;

import CosplayCostumes.app.model.Opinion;
import CosplayCostumes.app.model.Product;
import CosplayCostumes.user.model.User;
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
