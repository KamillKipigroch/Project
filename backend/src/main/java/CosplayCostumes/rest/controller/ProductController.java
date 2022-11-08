package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.*;
import CosplayCostumes.rest.model.dto.ProductDTO;
import CosplayCostumes.rest.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("api/product")
public class ProductController {
    private final ProductService productService;
    private final ProductImageController productImageController;
    private final ProductTypeService productTypeService;
    private final ConditionService conditionService;
    private final QualityService qualityService;
    private final CategoryService categoryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Product>> getAllQualities() {
        List<Product> allProduct = productService.findAllProduct();
        return new ResponseEntity<>(allProduct, HttpStatus.OK);
    }

    @GetMapping("/find/{businessKey}")
    public ResponseEntity<Product> findQuality(@PathVariable("businessKey") String code) {
        Product product = productService.findProductByBusinessKey(code);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
        ProductType productType = productTypeService.findProductTypeById(productDTO.getProductTypeID());


        String businessKey = String.valueOf(100000000 + productService.findAllProduct().size()) + productType.getCode().substring(2);
        Category category = categoryService.findCategoryById(productDTO.getCategoryID());
        Quality quality = qualityService.findQualityById(productDTO.getQualityID());
        Condition condition = conditionService.findConditionByID(productDTO.getConditionID());

        Product newProduct = productService.addProduct(productDTO, businessKey, productType, category, quality, condition);
        productDTO.getProductImages().forEach(image -> {
            image.setProductID(newProduct.getId());
            productImageController.addProductImage(image);
        });
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product newQuality = productService.updateProduct(product);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/delete")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Product> deleteProduct(@RequestBody Product product) {
        productService.deleteProduct(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
