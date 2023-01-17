package CosplayCostumes.rest.controller;

import CosplayCostumes.rest.model.*;
import CosplayCostumes.rest.model.dto.ModelDTO;
import CosplayCostumes.rest.model.dto.product.ProductDTO;
import CosplayCostumes.rest.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static CosplayCostumes.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RestController
@AllArgsConstructor
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;
    private final OrderService orderService;
    private final ProductImageController productImageController;
    private final ProductTypeService productTypeService;
    private final ConditionService conditionService;
    private final QualityService qualityService;
    private final SubCategoryService subCategoryService;

    @GetMapping("/get-all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> allProduct = productService.findAllProduct();
        return new ResponseEntity<>(allProduct, HttpStatus.OK);
    }

    @GetMapping("/get-all-filtered")
    public ResponseEntity<List<Product>> getAllProductsFiltered() {
        List<Product> allProduct = productService.findAllProduct();
        allProduct.forEach(product ->
                product.setPrice(
                        (product.getPrice() * product.getCondition().getPrice()) / 100
                ));

        var notAvailable = orderService.findAllOrder().stream().filter(order -> order.getOrderStatus().getId() == 2).map(Order::getProduct).collect(Collectors.toSet());
        allProduct.removeIf(notAvailable::contains);
        return new ResponseEntity<>(allProduct, HttpStatus.OK);
    }

    @RequestMapping(value = "/find/{id}", method = RequestMethod.GET)
    public ResponseEntity<Product> findProductId(@PathVariable Long id) {
        Product product = productService.findProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
        ProductType productType = productTypeService.findProductTypeById(productDTO.getProductTypeID());
        String businessKey = String.valueOf(100000000 + productService.findAllProduct().size()) + productType.getCode().substring(2);
        Subcategory subcategory = subCategoryService.findSubCategoryById(productDTO.getSubCategoryID());
        Quality quality = qualityService.findQualityById(productDTO.getQualityID());
        Condition condition = conditionService.findConditionByID(productDTO.getConditionID());

        Product newProduct = productService.addProduct(productDTO, productDTO.getSize(), businessKey, productType, subcategory, quality, condition);
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    @PutMapping("/update")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<Product> updateProduct(@RequestBody Product product) {
        Product newQuality = productService.updateProduct(product);
        return new ResponseEntity<>(newQuality, HttpStatus.OK);
    }

    @PutMapping("/disable-visibility")
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    public ResponseEntity<HttpStatus> deleteProduct(@RequestBody ModelDTO modelDTO) {
        productService.deleteProduct(modelDTO.getId());
        return new ResponseEntity<>(HttpStatus.OK, HttpStatus.OK);
    }
}
