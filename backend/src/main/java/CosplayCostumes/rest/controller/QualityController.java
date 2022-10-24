package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Quality;
import CosplayCostumes.rest.model.dto.QualityDTO;
import CosplayCostumes.rest.service.QualityService;
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
    public ResponseEntity<List<Quality>> getAllQualities() {
        List<Quality> allQuality = qualityService.findAllQuality();
        return new ResponseEntity<>(allQuality, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<Quality> findQuality(@PathVariable("code") String code) {
        Quality quality = qualityService.findQualityByCode(code);
        return new ResponseEntity<>(quality, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Quality> addQuality(@RequestBody QualityDTO quality) {
        Quality newQuality = qualityService.addQuality(quality);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }
    @PutMapping("/update")
    public ResponseEntity<Quality> updateQuality(@RequestBody Quality quality) {
        Quality newQuality = qualityService.updateQuality(quality);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Quality> deleteSubcategory(@RequestBody Quality quality) {
        qualityService.deleteQuality(quality);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
