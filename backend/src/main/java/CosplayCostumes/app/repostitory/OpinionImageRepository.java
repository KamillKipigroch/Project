package CosplayCostumes.app.repostitory;

import CosplayCostumes.app.model.OpinionImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OpinionImageRepository extends JpaRepository<OpinionImage, Long> {
    Optional<OpinionImage> findById(Long id);

    Optional<OpinionImage> findByCode(String code);
}
