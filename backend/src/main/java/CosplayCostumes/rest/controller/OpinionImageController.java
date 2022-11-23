package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.OpinionImage;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.opinionImage.OpinionImageDTO;
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
//    private final CloudinaryService cloudinaryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<OpinionImage>> getAllOpinionImage() {
        List<OpinionImage> opinionImages = opinionImageService.findAllOpinionImage();
//        List<ByteArrayResource> listImage = new ArrayList<ByteArrayResource>();
//        opinionImages.forEach(image -> listImage.add(cloudinaryService.downloadImg(image.getCode(), 1024, 768, false)));
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.add("content-disposition", "attachment; filename=image.jpg");
//        responseHeaders.add("Content-Type", "image/jpeg");
//
//        return ResponseEntity.ok().headers(responseHeaders).contentLength(listImage.stream().mapToLong(ByteArrayResource::contentLength).sum()).body(listImage);
        return new ResponseEntity<>(opinionImages, HttpStatus.OK);
    }

    @PostMapping("/add-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OpinionImage> addOpinionImage(@RequestBody OpinionImageDTO opinionImageDTO) {
        OpinionImage opinionImage;
        try {
//            String code = cloudinaryService.upload(opinionImageDTO.getFile());
            opinionImage = opinionImageService.addOpinionImage(opinionService.findOpinionById(opinionImageDTO.getOpinionId()), opinionImageDTO.getFileUrl());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(opinionImage, HttpStatus.OK);
    }

    @PutMapping("/disable-visibility-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteOpinionImage(@RequestBody ModelDTO modelDTO) {
        opinionImageService.deleteOpinionImage(opinionImageService.findOpinionImageById(modelDTO.getId()));
        return new ResponseEntity<>(HttpStatus.OK, HttpStatus.OK);
    }
}
