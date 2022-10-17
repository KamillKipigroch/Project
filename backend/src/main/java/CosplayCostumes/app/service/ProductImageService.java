package CosplayCostumes.app.service;

import CosplayCostumes.app.model.Product;
import CosplayCostumes.app.model.ProductImage;
import CosplayCostumes.app.repostitory.ProductImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductImageService {
    private final static String PRODUCT_IMAGE_NO_FOUND = "Failed to find products images product ";
    private final static String PRODUCT_IMAGE_EXIST = "Product image with this name with this name is exist ";
    private final ProductImageRepository productImageRepository;

    public List<ProductImage> findAllProductImage() {
        return productImageRepository.findAll();
    }

    public List<ProductImage> findProductImageByProduct(Product product) throws Exception {
        return productImageRepository.findByProduct(product).orElseThrow(() -> new Exception(PRODUCT_IMAGE_NO_FOUND + product.getBusinessKey()));
    }

    public ProductImage addProductImage(ProductImage productImage) {
        if (productImageRepository.findByCode(productImage.getCode()).isPresent())
            throw new FindException(PRODUCT_IMAGE_EXIST + productImage.getCode());
        return productImageRepository.save(productImage);
    }

    public ProductImage updateProductImage(ProductImage productImage) {
        return productImageRepository.save(productImage);
    }

    public void deleteProductImage(ProductImage productImage) {
        productImage.setVisible(false);
        productImageRepository.save(productImage);
    }
}
