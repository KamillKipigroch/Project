package CosplayCostumes.app.controller;

import CosplayCostumes.app.model.*;
import CosplayCostumes.app.model.dto.ProductDTO;
import CosplayCostumes.app.service.*;
import lombok.AllArgsConstructor;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Parser;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;
    private final ProductImageService productImageService;
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
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
        ProductType productType = productTypeService.findProductTypeById(productDTO.getProductTypeID());
        String businessKey = String.valueOf(100000000 + productService.findAllProduct().size()) + productType.getCode().substring(2);
        Category category = categoryService.findCategoryById(productDTO.getCategoryID());
        Quality quality = qualityService.findQualityById(productDTO.getQualityID());
        Condition condition = conditionService.findConditionByID(productDTO.getConditionID());

        Product newProduct = productService.addProduct(productDTO, businessKey, productType, category, quality, condition);

        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product newQuality = productService.updateProduct(product);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/delete")
    public ResponseEntity<Product> deleteProduct(@RequestBody Product product) {
        productService.deleteProduct(product);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
