package CosplayCostumes.rest.service;

import CosplayCostumes.rest.model.ProductType;
import CosplayCostumes.rest.model.dto.ProductTypeDTO;
import CosplayCostumes.rest.repostitory.ProductTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductTypeService {
    private final static String PRODUCT_TYPE_NO_FOUND = "Failed to find quality with name ";
    private final static String PRODUCT_TYPE_ID_NO_FOUND = "Failed to find quality with id ";
    private final static String PRODUCT_TYPE_EXIST = "Quality with this name is already exist ! ";
    private final ProductTypeRepository productTypeRepository;

    public List<ProductType> findAllProductType() {
        return productTypeRepository.findAll();
    }

    public ProductType findProductTypeByCode(String code) {
        return productTypeRepository.findByCode(code).orElseThrow(() -> new FindException(PRODUCT_TYPE_NO_FOUND + code));
    }
    public ProductType findProductTypeById(Long id) {
        return productTypeRepository.findById(id).orElseThrow(() -> new FindException(PRODUCT_TYPE_ID_NO_FOUND + id));
    }

    public ProductType addProductType(ProductTypeDTO productType) {
        if (productTypeRepository.findByCode(productType.getCode()).isPresent())
            throw new FindException(PRODUCT_TYPE_EXIST);

        ProductType newProductType = new ProductType(productType.getCode());
        return productTypeRepository.save(newProductType);
    }

    public ProductType updateProductType(ProductType productType) {
        return productTypeRepository.save(productType);
    }

    public void deleteProductType(ProductType productType) {
        productTypeRepository.findById(productType.getId()).orElseThrow(() ->
                new FindException(PRODUCT_TYPE_ID_NO_FOUND + productType.getId()));
        productType.setVisible(false);
        productTypeRepository.save(productType);
    }
}
