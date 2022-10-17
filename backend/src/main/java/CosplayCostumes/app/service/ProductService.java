package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Product;
import CosplayCostumes.app.repostitory.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {
    private final static String PRODUCT_NO_FOUND = "Failed to find product with business key ";
    private final ProductRepository productRepository;
    public List<Product> findAllCategory() {
        return productRepository.findAll();
    }

    public Product findProductByBusinessKey(String businessKey) {
        return productRepository.findByBusinessKey(businessKey)
                .orElseThrow(() -> new FindException(PRODUCT_NO_FOUND + businessKey));
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Product product) {
        product.setVisible(false);
        productRepository.save(product);
    }
}
