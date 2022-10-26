package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.OpinionImage;
import CosplayCostumes.rest.model.dto.OpinionImageDTO;
import CosplayCostumes.rest.service.OpinionImageService;
import CosplayCostumes.rest.service.OpinionService;
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
@RequestMapping("/api/opinion-image")
public class OpinionImageController {
    private final OpinionImageService opinionImageService;
    private final OpinionService opinionService;

    @GetMapping("/get-all")
    public ResponseEntity<List<OpinionImage>> getAll() {
        List<OpinionImage> opinionImages = opinionImageService.findAllOpinionImage();
        return new ResponseEntity<>(opinionImages, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<OpinionImage> findByCode(@PathVariable("code") String code) throws Exception {
        OpinionImage opinionImage = opinionImageService.findOpinionImageByCode(code);
        return new ResponseEntity<>(opinionImage, HttpStatus.OK);
    }

    @PostMapping("/add-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OpinionImage> addOpinionImage(@RequestBody OpinionImageDTO opinionImageDTO) throws Exception {
        OpinionImage opinionImage = opinionImageService.addOpinionImage(opinionImageDTO, opinionService.findOpinionById(opinionImageDTO.getOpinionId()));
        return new ResponseEntity<>(opinionImage, HttpStatus.OK);
    }

    @PutMapping("/update-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OpinionImage> updateOpinionImage(@RequestBody OpinionImage opinionImage) {
        OpinionImage updateOpinionImage = opinionImageService.updateOpinionImage(opinionImage);
        return new ResponseEntity<>(updateOpinionImage, HttpStatus.OK);
    }

    @PutMapping("/delete-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OpinionImage> deleteOpinionImage(@RequestBody OpinionImage opinionImage) {
        opinionImageService.deleteOpinionImage(opinionImage);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
