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
        var products = productRepository.findAll();
        products.forEach(product -> product.setImages(product.getImages().stream().sorted((i1, i2) -> i1.getId().compareTo(i2.getId())).toList()));
        return products;
    }

    public Product findProductById(Long id) {
        var product = productRepository.findById(id).orElseThrow(() -> new FindException(PRODUCT_ID_NO_FOUND + id));
        product.setImages(product.getImages().stream().sorted((i1, i2) -> i1.getId().compareTo(i2.getId())).toList());
        return product;
    }

    public void addImageToProduct(ProductImage productImage, Long id) {
        Product p = productRepository.findById(id).orElseThrow(() -> new FindException(PRODUCT_ID_NO_FOUND + id));
        p.getImages().add(productImage);
        productRepository.save(p);
    }

    public Product findProductByBusinessKey(String businessKey) {
        return productRepository.findByBusinessKey(businessKey).orElseThrow(() -> new FindException(PRODUCT_NO_FOUND + businessKey));
    }

    public Product addProduct(ProductDTO product, String size, String businessKey, ProductType productType, Subcategory subcategory, Quality quality, Condition condition) {
        LocalDateTime createDate = LocalDateTime.now();
        Product newProduct = new Product(size, businessKey, productType, null, subcategory, condition, quality, null, null, product.getCode(), product.getDescription(), product.getPrice(), product.getHero(), createDate);

        return productRepository.save(newProduct);
    }

    public Product updateProduct(Product product) {
        var updateProduct = productRepository.findById(product.getId()).orElseThrow(() ->
                new FindException(PRODUCT_ID_NO_FOUND + product.getId()));

        updateProduct.setProductType(product.getProductType());
        updateProduct.setHero(product.getHero());
        updateProduct.setCode(product.getCode());
        updateProduct.setSize(product.getSize());
        updateProduct.setCondition(product.getCondition());
        updateProduct.setDescription(product.getDescription());
        updateProduct.setImages(product.getImages());
        updateProduct.setPrice(product.getPrice());
        updateProduct.setVisible(product.getVisible());
        updateProduct.setQuality(product.getQuality());


        return productRepository.save(updateProduct);
    }

    public void deleteProduct(Long id) {
        var product = productRepository.findById(id).orElseThrow(() ->
                new FindException(PRODUCT_ID_NO_FOUND + id));
        product.setVisible(false);
        productRepository.save(product);
    }
}
