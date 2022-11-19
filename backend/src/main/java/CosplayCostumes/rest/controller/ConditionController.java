package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Category;
import CosplayCostumes.rest.model.Condition;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.condition.ConditionDTO;
import CosplayCostumes.rest.service.ConditionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/api/condition")
public class ConditionController {
    private final ConditionService conditionService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Condition>> getAllCondition() {
        List<Condition> conditions = conditionService.findAllConditions();
        return new ResponseEntity<>(conditions, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Condition> findConditionById(@PathVariable Long id) {
        Condition category = conditionService.findConditionByID(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }


    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Condition> addCondition(@RequestBody ConditionDTO condition) {
        Condition newCategory = conditionService.addCondition(condition);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Condition> updateCondition(@RequestBody Condition condition) {
        Condition newCategory = conditionService.updateCondition(condition);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/disable-visibility")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteCondition(@RequestBody ModelDTO modelDTO) {
        conditionService.deleteCondition(modelDTO.getId());
        return new ResponseEntity<>(HttpStatus.OK, HttpStatus.OK);
    }
}
