package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.Opinion;
import CosplayCostumes.rest.model.Product;
import CosplayCostumes.rest.model.dto.opinion.OpinionDTO;
import CosplayCostumes.rest.model.dto.opinion.OpinionRequest;
import CosplayCostumes.rest.model.dto.opinionImage.OpinionImageDTO;
import CosplayCostumes.rest.repostitory.OpinionRepository;
import CosplayCostumes.security.user.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class OpinionService {
    private final static String OPINION_NO_FOUND = "Failed to find opinion with user \s and product \s";
    private final static String OPINION_ID_NO_FOUND = "Failed to find opinion with id ";
    private final static String OPINION_EXIST = "User already has an opinion about this product !";
    private final OpinionRepository opinionRepository;

    public List<Opinion> findAllOpinion() {
        return opinionRepository.findAll();
    }

    public Opinion findOpinionByUserAndProduct(User user, Product product) {
        return opinionRepository.findOpinionByUserAndProduct(user, product).orElseThrow(() -> new FindException(OPINION_NO_FOUND + user.getEmail() + product.getBusinessKey()));
    }
    public Opinion findOpinionById(Long id) {
        return opinionRepository.findById(id).orElseThrow(() -> new FindException(OPINION_ID_NO_FOUND + id));
    }

    public Opinion addOpinion(OpinionRequest opinion, User user, Product product) {
        if( opinionRepository.findOpinionByUserAndProduct(user, product).isPresent()) {
            throw new FindException(OPINION_EXIST);
        }

        LocalDateTime createDate = LocalDateTime.now();
        Opinion newOpinion = new Opinion(user, product, opinion.getValue() ,opinion.getDescription(),createDate);

        return opinionRepository.save(newOpinion);
    }

    public Opinion updateOpinion(OpinionDTO opinion) {
       Opinion op = opinionRepository.findById(opinion.getId()).orElseThrow(() -> new FindException(OPINION_NO_FOUND + opinion.getId()));
       op.setValue(opinion.getValue());
       op.setDescription(opinion.getDescription());
       op.setCreateDate(LocalDateTime.now());

        return opinionRepository.save(op);
    }

    public void deleteOpinion(Long id) {
        Opinion opinion = opinionRepository.findById(id).orElseThrow(() -> new FindException(OPINION_NO_FOUND + id));
        opinion.setVisible(false);
        opinionRepository.save(opinion);
    }
}
