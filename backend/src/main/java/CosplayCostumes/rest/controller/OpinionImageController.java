package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.OpinionImage;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.opinionImage.OpinionImageDTO;
import CosplayCostumes.rest.service.OpinionImageService;
import CosplayCostumes.rest.service.OpinionService;
import CosplayCostumes.rest.service.CloudinaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/api/opinion-image")
public class OpinionImageController {
    private final OpinionImageService opinionImageService;
    private final OpinionService opinionService;
    private final CloudinaryService cloudinaryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<ByteArrayResource>> getAll() {
        List<OpinionImage> opinionImages = opinionImageService.findAllOpinionImage();
        List<ByteArrayResource> listImage = new ArrayList<ByteArrayResource>();
        opinionImages.forEach(image -> listImage.add(cloudinaryService.downloadImg(image.getCode(), 1024, 768, false)));
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("content-disposition", "attachment; filename=image.jpg");
        responseHeaders.add("Content-Type", "image/jpeg");

        return ResponseEntity.ok().headers(responseHeaders).contentLength(listImage.stream().mapToLong(ByteArrayResource::contentLength).sum()).body(listImage);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<ByteArrayResource> findByCode(@PathVariable("code") String code) throws Exception {
        OpinionImage opinionImage = opinionImageService.findOpinionImageByCode(code);

        ByteArrayResource image = cloudinaryService.downloadImg(opinionImage.getCode(), 1024, 768, false);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("content-disposition", "attachment; filename=image.jpg");
        responseHeaders.add("Content-Type", "image/jpeg");

        return ResponseEntity.ok().headers(responseHeaders).contentLength(image.contentLength()).body(image);
    }

    @PostMapping("/add-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OpinionImage> addOpinionImage(@RequestBody OpinionImageDTO opinionImageDTO) {
        OpinionImage opinionImage;
        try {
            String code = cloudinaryService.upload(opinionImageDTO.getFile());
            opinionImage = opinionImageService.addOpinionImage(opinionService.findOpinionById(opinionImageDTO.getOpinionId()), code);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(opinionImage, HttpStatus.OK);
    }

    @PutMapping("/delete-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<String> deleteOpinionImage(@RequestBody ModelDTO modelDTO) {
        opinionImageService.deleteOpinionImage(opinionImageService.findOpinionImageById(modelDTO.getId()));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
