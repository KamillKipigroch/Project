package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.OpinionImage;
import CosplayCostumes.rest.model.ProductImage;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.opinionImage.OpinionImageDTO;
import CosplayCostumes.rest.service.OpinionImageService;
import CosplayCostumes.rest.service.OpinionService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@AllArgsConstructor
@RequestMapping("/api/opinion-image")
public class OpinionImageController {
    private final OpinionImageService opinionImageService;
    private final OpinionService opinionService;
    private final Cloudinary cloudinary;

    @RequestMapping(path = "/add-object", method = POST, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<OpinionImage> upload(@RequestPart("opinionId") String opinionId, @RequestPart("image") MultipartFile image) throws IOException {
        var opinion = opinionService.findOpinionById(Long.parseLong(opinionId));
        var uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
        var productImage = opinionImageService.addOpinionImage(uploadResult.get("url").toString(),opinion);

        return new ResponseEntity<>(productImage, HttpStatus.OK);
    }


    @PutMapping("/disable-visibility-object")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteOpinionImage(@RequestBody ModelDTO modelDTO) {
        opinionImageService.deleteOpinionImage(opinionImageService.findOpinionImageById(modelDTO.getId()));
        return new ResponseEntity<>(HttpStatus.OK, HttpStatus.OK);
    }
}
