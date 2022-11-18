package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.Quality;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.quality.QualityDTO;
import CosplayCostumes.rest.service.QualityService;
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
@RequestMapping("/api/quality")
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

    @GetMapping("/find/{id}")
    public ResponseEntity<Quality> findQuality(@PathVariable("id") Long id) {
        Quality quality = qualityService.findQualityById(id);
        return new ResponseEntity<>(quality, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Quality> addQuality(@RequestBody QualityDTO quality) {
        Quality newQuality = qualityService.addQuality(quality);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Quality> updateQuality(@RequestBody Quality quality) {
        Quality newQuality = qualityService.updateQuality(quality);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/delete")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteSubcategory(@RequestBody ModelDTO modelDTO) {
        qualityService.deleteQuality(modelDTO.getId());
        return new ResponseEntity<>(HttpStatus.OK, HttpStatus.OK);
    }
}
