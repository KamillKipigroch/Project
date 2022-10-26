package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.ProductImage;
import CosplayCostumes.rest.model.dto.ProductImageDTO;
import CosplayCostumes.rest.service.ProductImageService;
import CosplayCostumes.rest.service.ProductService;
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
@RequestMapping("/api/product-image")
public class ProductImageController {
    private final ProductImageService productImageService;
    private final ProductService productService;

    @GetMapping("/get-all")
    public ResponseEntity<List<ProductImage>> getAll() {
        List<ProductImage> opinionImages = productImageService.findAllProductImage();
        return new ResponseEntity<>(opinionImages, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<ProductImage> findByCode(@PathVariable("code") String code) throws Exception {
        ProductImage productImage = productImageService.findProductImageByCode(code);
        return new ResponseEntity<>(productImage, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductImage> addProductImage(@RequestBody ProductImageDTO productImageDTO) {
        ProductImage productImage = productImageService.addProductImage(productImageDTO, productService.findProductById(productImageDTO.getProductID()));
        return new ResponseEntity<>(productImage, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductImage> updateProductImage(@RequestBody ProductImage productImage) {
        ProductImage updateOpinionImage = productImageService.updateProductImage(productImage);
        return new ResponseEntity<>(updateOpinionImage, HttpStatus.OK);
    }

    @PutMapping("/delete")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductImage> deleteProductImage(@RequestBody ProductImage productImage) {
        productImageService.deleteProductImage(productImage);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
