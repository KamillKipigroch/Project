package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.ProductType;
import CosplayCostumes.app.model.dto.ProductTypeDTO;
import CosplayCostumes.app.service.ProductTypeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/product-type")
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
    public ResponseEntity<ProductType> addProductType(@RequestBody ProductTypeDTO productTypeDTO) {
        ProductType newCategory = productTypeService.addProductType(productTypeDTO);
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ProductType> updateProductType(@RequestBody ProductType productType) {
        ProductType newType = productTypeService.updateProductType(productType);
        return new ResponseEntity<>(newType, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<ProductType> deleteCategory(@RequestBody ProductType productType) {
        productTypeService.deleteProductType(productType);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
