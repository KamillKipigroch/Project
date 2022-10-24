package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.*;
import CosplayCostumes.rest.model.dto.ProductDTO;
import CosplayCostumes.rest.repostitory.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {
    private final static String PRODUCT_NO_FOUND = "Failed to find product with business key ";
    private final static String PRODUCT_ID_NO_FOUND = "Failed to find product with id ";
    private final ProductRepository productRepository;

    public List<Product> findAllProduct() {
        return productRepository.findAll();
    }

    public Product findProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new FindException(PRODUCT_ID_NO_FOUND + id));
    }

    public Product findProductByBusinessKey(String businessKey) {
        return productRepository.findByBusinessKey(businessKey).orElseThrow(() -> new FindException(PRODUCT_NO_FOUND + businessKey));
    }

    public Product addProduct(ProductDTO product, String businessKey, ProductType productType, Category category, Quality quality, Condition condition) {
        LocalDateTime createDate = LocalDateTime.now();
        Product newProduct = new Product(businessKey, productType, null, category, condition, quality, null, null, product.getCode(), product.getDescription(), product.getPrice(), product.getHero(), createDate);

        return productRepository.save(newProduct);
    }

    public Product updateProduct(Product product) {
        productRepository.findById(product.getId()).orElseThrow(() ->
                new FindException(PRODUCT_ID_NO_FOUND + product.getId()));
        return productRepository.save(product);
    }

    public void deleteProduct(Product product) {
        productRepository.findById(product.getId()).orElseThrow(() ->
                new FindException(PRODUCT_ID_NO_FOUND + product.getId()));
        product.setVisible(false);
        productRepository.save(product);
    }
}
