package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.ProductImage;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.service.ProductImageService;
import CosplayCostumes.rest.service.ProductService;
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

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@AllArgsConstructor
@RequestMapping("/api/product-image")
public class ProductImageController {
    private final ProductImageService productImageService;
    private final ProductService productService;
    private final Cloudinary cloudinary;

    @RequestMapping(path = "/add", method = POST, consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<ProductImage> upload(@RequestPart("productId") String productId, @RequestPart("image") MultipartFile image) throws IOException {
        var product = productService.findProductById(Long.parseLong(productId));
        var uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
        var productImage = productImageService.addProductImage(uploadResult.get("url").toString(),product);

        return new ResponseEntity<>(productImage, HttpStatus.OK);
    }

    @PutMapping("/disable-visibility")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductImage> deleteProductImage(@RequestBody ModelDTO modelDTO) {
        productImageService.deleteProductImage(modelDTO.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
