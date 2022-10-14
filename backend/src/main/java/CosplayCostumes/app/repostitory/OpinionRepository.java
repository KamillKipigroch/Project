package CosplayCostumes.app.repostitory;

import CosplayCostumes.app.model.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    Optional<Opinion> findById(Long id);
}
