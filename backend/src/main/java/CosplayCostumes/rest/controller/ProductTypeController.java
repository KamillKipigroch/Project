package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.ProductType;
import CosplayCostumes.rest.model.dto.ProductTypeDTO;
import CosplayCostumes.rest.service.ProductTypeService;
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
@RequestMapping("/api/product-type")
public class ProductTypeController {
    private final ProductTypeService productTypeService;

    @GetMapping("/get-all")
    public ResponseEntity<List<ProductType>> getAllProductType() {
        List<ProductType> allProductTypes = productTypeService.findAllProductType();
        return new ResponseEntity<>(allProductTypes, HttpStatus.OK);
    }

    @GetMapping("/find/{code}")
    public ResponseEntity<ProductType> findProductType(@PathVariable("code") String code) throws Exception {
        ProductType orderStatus = productTypeService.findProductTypeByCode(code);
        return new ResponseEntity<>(orderStatus, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductType> addProductType(@RequestBody ProductTypeDTO productTypeDTO) {
        ProductType newCategory = productTypeService.addProductType(productTypeDTO);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductType> updateProductType(@RequestBody ProductType productType) {
        ProductType newType = productTypeService.updateProductType(productType);
        return new ResponseEntity<>(newType, HttpStatus.OK);
    }

    @PutMapping("/delete")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<ProductType> deleteCategory(@RequestBody ProductType productType) {
        productTypeService.deleteProductType(productType);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
