package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Condition;
import CosplayCostumes.app.repostitory.ConditionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class ConditionService {
    private final static String CONDITION_NO_FOUND = "Failed to find condition with name ";

    private final static String CONDITION_EXIST = "Condition with this name is already exist ! ";
    private final ConditionRepository conditionRepository;

    public List<Condition> findAllConditions() {
        return conditionRepository.findAll();
    }

    public Condition findConditionByCode(String code) throws Exception {
        return conditionRepository.findByCode(code).orElseThrow(() -> new Exception(CONDITION_NO_FOUND + code));
    }

    public Condition addCondition(Condition condition) {
        if (conditionRepository.findByCode(condition.getCode()).isPresent())
            throw new FindException(CONDITION_EXIST + condition.getCode());
        else {
            condition = conditionRepository.save(condition);
        }
        return condition;
    }

    public Condition updateCondition(Condition condition) {
        return conditionRepository.save(condition);
    }

    public void deleteCondition(Condition condition) {
        condition.setVisible(false);
        conditionRepository.save(condition);
    }
}
