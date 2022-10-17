package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.Condition;
import CosplayCostumes.app.model.Quality;
import CosplayCostumes.app.model.dto.ConditionDTO;
import CosplayCostumes.app.model.dto.QualityDTO;
import CosplayCostumes.app.service.ConditionService;
import CosplayCostumes.app.service.QualityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/quality")
public class QualityController {
    private final QualityService qualityService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Quality>> getAllCategory() {
        List<Quality> allQuality = qualityService.findAllQuality();
        return new ResponseEntity<>(allQuality, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<Quality> findCategory(@PathVariable("code") String code) {
        Quality quality = qualityService.findQualityByCode(code);
        return new ResponseEntity<>(quality, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Quality> addCategory(@RequestBody QualityDTO quality) {
        Quality newQuality = qualityService.addQuality(quality);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }
}
