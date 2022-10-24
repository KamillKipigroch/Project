package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.Opinion;
import CosplayCostumes.rest.model.OpinionImage;
import CosplayCostumes.rest.model.Product;
import CosplayCostumes.rest.model.dto.OpinionDTO;
import CosplayCostumes.rest.repostitory.OpinionRepository;
import CosplayCostumes.security.user.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class OpinionService {
    private final static String OPINION_NO_FOUND = "Failed to find opinion with user \s and product \s";
    private final static String OPINION_ID_NO_FOUND = "Failed to find opinion with id ";
    private final static String OPINION_EXIST = "Condition with this name is already exist ! ";
    private final OpinionRepository opinionRepository;

    public List<Opinion> findAllOpinion() {
        return opinionRepository.findAll();
    }

    public Opinion findOpinionByUserAndProduct(User user, Product product) throws Exception {
        return opinionRepository.findOpinionByUserAndProduct(user, product).orElseThrow(() -> new Exception(OPINION_NO_FOUND + user.getEmail() + product.getBusinessKey()));
    }
    public Opinion findOpinionById(Long id) throws Exception {
        return opinionRepository.findById(id).orElseThrow(() -> new Exception(OPINION_ID_NO_FOUND + id));
    }

    public Opinion addOpinion(OpinionDTO opinion, Set<OpinionImage> opinionImages, User user, Product product) {
        opinionRepository.findOpinionByUserAndProduct(user, product).orElseThrow( () ->
             new FindException(OPINION_EXIST));

        LocalDateTime createDate = LocalDateTime.now();
        Opinion newOpinion = new Opinion(user, product, opinionImages, opinion.getValue() ,opinion.getDescription(),createDate);

        return opinionRepository.save(newOpinion);
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
        if (opinionRepository.findById(opinion.getId()).isEmpty())
            throw new FindException(OPINION_NO_FOUND + opinion.getId());
        opinion.setVisible(false);
        opinionRepository.save(opinion);
    }
}
