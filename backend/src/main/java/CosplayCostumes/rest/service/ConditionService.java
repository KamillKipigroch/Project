package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.Condition;
import CosplayCostumes.rest.model.dto.condition.ConditionDTO;
import CosplayCostumes.rest.repostitory.ConditionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class ConditionService {
    private final static String CONDITION_NO_FOUND = "Failed to find condition with name ";
    private final static String CONDITION_ID_NO_FOUND = "Failed to find condition with name ";
    private final static String CONDITION_EXIST = "Condition with this name is already exist ! ";
    private final ConditionRepository conditionRepository;

    public List<Condition> findAllConditions() {
        return conditionRepository.findAll();
    }

    public Condition findConditionByCode(String code) {
        return conditionRepository.findByCode(code).orElseThrow(() -> new FindException(CONDITION_NO_FOUND + code));
    }
    public Condition findConditionByID(Long id) {
        return conditionRepository.findById(id).orElseThrow(() -> new FindException(CONDITION_ID_NO_FOUND + id));
    }

    public Condition addCondition(ConditionDTO condition) {
        if (conditionRepository.findByCode(condition.getCode()).isPresent()) {
            throw new FindException(CONDITION_EXIST + condition.getCode());
        }

        Condition newCondition = new Condition();
        newCondition.setCode(condition.getCode());
        newCondition.setVisible(true);
        newCondition.setPrice(condition.getPrice());
        return conditionRepository.save(newCondition);
    }

    public Condition updateCondition(Condition condition) {
        var update =conditionRepository.findById(condition.getId()).orElseThrow( () ->
                new FindException(CONDITION_ID_NO_FOUND + condition.getId()));
        update.setCode(condition.getCode());
        update.setVisible(condition.getVisible());
        update.setPrice(condition.getPrice());
        return conditionRepository.save(update);
    }

    public void deleteCondition(Long id) {
        Condition c = conditionRepository.findById(id).orElseThrow( () ->
                new FindException(CONDITION_ID_NO_FOUND + id));
        c.setVisible(false);
        conditionRepository.save(c);
    }
}
