package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.ProductImage;
import CosplayCostumes.rest.model.dto.ProductImageDTO;
import CosplayCostumes.rest.service.CloudinaryService;
import CosplayCostumes.rest.service.ProductImageService;
import CosplayCostumes.rest.service.ProductService;
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
@RequestMapping("/api/product-image")
public class ProductImageController {
    private final ProductImageService productImageService;
    private final ProductService productService;
    private final CloudinaryService cloudinaryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<ByteArrayResource>> getAll() {
        List<ProductImage> productImage = productImageService.findAllProductImage();
        List<ByteArrayResource> listImage = new ArrayList<>();
        productImage.forEach(image -> listImage.add(cloudinaryService.downloadImg(image.getCode(), 1024, 768, false)));
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("content-disposition", "attachment; filename=image.jpg");
        responseHeaders.add("Content-Type", "image/jpeg");

        return ResponseEntity.ok().headers(responseHeaders).contentLength(listImage.stream().mapToLong(ByteArrayResource::contentLength).sum()).body(listImage);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<ByteArrayResource> findByCode(@PathVariable("code") String code) throws Exception {
        ByteArrayResource image = cloudinaryService.downloadImg(code, 1024, 768, false);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("content-disposition", "attachment; filename=image.jpg");
        responseHeaders.add("Content-Type", "image/jpeg");

        return ResponseEntity.ok().headers(responseHeaders).contentLength(image.contentLength()).body(image);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductImage> addProductImage(@RequestBody ProductImageDTO productImageDTO) {
        ProductImage productImage;
        try {
            String code = cloudinaryService.upload(productImageDTO.getFile());
            productImage = productImageService.addProductImage(productService.findProductById(productImageDTO.getProductID()), code);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(productImage, HttpStatus.OK);
    }

    @PutMapping("/delete")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductImage> deleteProductImage(@RequestBody ProductImage productImage) {
        productImageService.deleteProductImage(productImage);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
