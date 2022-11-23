package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.*;
import CosplayCostumes.rest.model.dto.product.ProductDTO;
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

    public void addImageToProduct(ProductImage productImage, Long id) {
        Product p = productRepository.findById(id).orElseThrow(() -> new FindException(PRODUCT_ID_NO_FOUND + id));
        p.getImages().add(productImage);
        productRepository.save(p);
    }

    public Product findProductByBusinessKey(String businessKey) {
        return productRepository.findByBusinessKey(businessKey).orElseThrow(() -> new FindException(PRODUCT_NO_FOUND + businessKey));
    }

    public Product addProduct(ProductDTO product, String businessKey, ProductType productType, Subcategory subcategory, Quality quality, Condition condition) {
        LocalDateTime createDate = LocalDateTime.now();
        Product newProduct = new Product(businessKey, productType, null, subcategory, condition, quality, null, null, product.getCode(), product.getDescription(), product.getPrice(), product.getHero(), createDate);

        return productRepository.save(newProduct);
    }

    public Product updateProduct(Product product) {
        var updateProduct = productRepository.findById(product.getId()).orElseThrow(() ->
                new FindException(PRODUCT_ID_NO_FOUND + product.getId()));
        if (product.getProductType() != null)
            updateProduct.setProductType(product.getProductType());
        else
            throw new IllegalArgumentException("Cunt save null value !");
        if (product.getProductType() != null)
            updateProduct.setHero(product.getHero());
        else
            throw new IllegalArgumentException("Cunt save null value !");
        if (product.getProductType() != null)
            updateProduct.setCode(product.getCode());
        else
            throw new IllegalArgumentException("Cunt save null value !");
        if (product.getProductType() != null)
            updateProduct.setCondition(product.getCondition());
        else
            throw new IllegalArgumentException("Cunt save null value !");
        if (product.getProductType() != null)
            updateProduct.setDescription(product.getDescription());
        else
            throw new IllegalArgumentException("Cunt save null value !");
        if (product.getProductType() != null)
            updateProduct.setImages(product.getImages());
        else
            throw new IllegalArgumentException("Cunt save null value !");
        if (product.getProductType() != null)
            updateProduct.setPrice(product.getPrice());
        else
            throw new IllegalArgumentException("Cunt save null value !");
        if (product.getProductType() != null)
            updateProduct.setVisible(product.getVisible());
        else
            throw new IllegalArgumentException("Cunt save null value !");
        if (product.getProductType() != null)
            updateProduct.setQuality(product.getQuality());
        else
            throw new IllegalArgumentException("Cunt save null value !");


        return productRepository.save(updateProduct);
    }

    public void deleteProduct(Long id) {
        var product = productRepository.findById(id).orElseThrow(() ->
                new FindException(PRODUCT_ID_NO_FOUND + id));
        product.setVisible(false);
        productRepository.save(product);
    }
}
