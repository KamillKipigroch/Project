package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Opinion;
import CosplayCostumes.app.model.Product;
import CosplayCostumes.app.repostitory.OpinionRepository;
import CosplayCostumes.user.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class OpinionService {
    private final static String OPINION_NO_FOUND = "Failed to find opinion with user \s and product \s";

    private final static String OPINION_EXIST = "Condition with this name is already exist ! ";

    private final OpinionRepository opinionRepository;

    public List<Opinion> findAllOpinion() {
        return opinionRepository.findAll();
    }

    public Opinion findOpinionByUserAndProduct(User user, Product product) throws Exception {
        return opinionRepository.findOpinionByUserAndProduct(user, product).orElseThrow(() -> new Exception(OPINION_NO_FOUND + user.getEmail() + product.getBusinessKey()));
    }

    public Opinion addOpinion(Opinion opinion) {
        if (opinionRepository.findOpinionByUserAndProduct(opinion.getUser(), opinion.getProduct()).isPresent())
            throw new FindException(OPINION_EXIST);
        return opinionRepository.save(opinion);
    }

    public Opinion updateOpinion(Opinion opinion) {
        if (opinionRepository.findById(opinion.getId()).isEmpty()) {
            throw new FindException(OPINION_NO_FOUND + opinion.getId());
        } else {
            opinion = opinionRepository.save(opinion);
        }

        return opinion;
    }

    public void deleteOpinion(Opinion opinion) {
        opinion.setVisible(false);
        opinionRepository.save(opinion);
    }
}
