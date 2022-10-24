package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.OpinionImage;
import CosplayCostumes.rest.model.dto.OpinionImageDTO;
import CosplayCostumes.rest.service.OpinionImageService;
import CosplayCostumes.rest.service.OpinionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/opinion-image")
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

    @PostMapping("/add")
    public ResponseEntity<OpinionImage> addOpinionImage(@RequestBody OpinionImageDTO opinionImageDTO) throws Exception {
        OpinionImage opinionImage = opinionImageService.addOpinionImage(opinionImageDTO, opinionService.findOpinionById(opinionImageDTO.getOpinionId()));
        return new ResponseEntity<>(opinionImage, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<OpinionImage> updateOpinionImage(@RequestBody OpinionImage opinionImage) {
        OpinionImage updateOpinionImage = opinionImageService.updateOpinionImage(opinionImage);
        return new ResponseEntity<>(updateOpinionImage, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<OpinionImage> deleteOpinionImage(@RequestBody OpinionImage opinionImage) {
        opinionImageService.deleteOpinionImage(opinionImage);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
