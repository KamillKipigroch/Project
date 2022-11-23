package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.Product;
import CosplayCostumes.rest.model.ProductImage;
import CosplayCostumes.rest.repostitory.ProductImageRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductImageService {
    private final static String PRODUCTS_IMAGE_NO_FOUND = "Failed to find products images with product ";
    private final static String PRODUCT_IMAGE_NO_FOUND = "Failed to find products images with name ";
    private final static String PRODUCT_IMAGE_NO_FOUND_ID = "Failed to find products images with id ";
    private final static String PRODUCT_IMAGE_EXIST = "Product image with this name with this name is exist ";
    private final ProductImageRepository productImageRepository;

    public List<ProductImage> findAllProductImage() {
        return productImageRepository.findAll();
    }

    public List<ProductImage> findProductImageByProduct(Product product) {
        return productImageRepository.findByProduct(product).orElseThrow(() -> new FindException(PRODUCTS_IMAGE_NO_FOUND + product.getBusinessKey()));
    }

    public ProductImage findProductImageByCode(String code){
        return productImageRepository.findByCode(code).orElseThrow( () -> new FindException(PRODUCT_IMAGE_NO_FOUND + code));
    }

    public ProductImage addProductImage( String code) {
        if (productImageRepository.findByCode(code).isPresent())
            throw new FindException(PRODUCT_IMAGE_EXIST + code);

        ProductImage newProductImage = new ProductImage(code, null);

        return productImageRepository.save(newProductImage);
    }

    public ProductImage updateProductImage(ProductImage productImage) {
        return productImageRepository.save(productImage);
    }

    public void deleteProductImage(Long id) {
        var delete = productImageRepository.findById(id).orElseThrow( () ->
                new FindException(PRODUCT_IMAGE_NO_FOUND_ID + id));
        delete.setVisible(false);
        productImageRepository.save(delete);
    }
}
