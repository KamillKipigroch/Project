package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.Category;
import CosplayCostumes.app.model.Condition;
import CosplayCostumes.app.model.dto.ConditionDTO;
import CosplayCostumes.app.service.ConditionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/condition")
public class ConditionController {
    private final ConditionService conditionService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Condition>> getAllCategory() {
        List<Condition> conditions = conditionService.findAllConditions();
        return new ResponseEntity<>(conditions, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<Condition> findCategory(@PathVariable("code") String code) {
        Condition category = conditionService.findConditionByCode(code);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Condition> addCategory(@RequestBody ConditionDTO condition) {
        Condition newCategory = conditionService.addCondition(condition);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }
}
