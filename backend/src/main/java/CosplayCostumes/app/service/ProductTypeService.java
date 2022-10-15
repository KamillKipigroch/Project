package CosplayCostumes.app.service;

import CosplayCostumes.app.model.ProductType;
import CosplayCostumes.app.repostitory.ProductTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.lang.module.FindException;
import java.util.List;

@Service
@AllArgsConstructor
public class ProductTypeService {
    private final static String PRODUCT_TYPE_NO_FOUND = "Failed to find quality with name";

    private final static String PRODUCT_TYPE_EXIST = "Quality with this name is already exist ! ";

    private final ProductTypeRepository productTypeRepository;

    public List<ProductType> findAllProductType() {
        return productTypeRepository.findAll();
    }

    public ProductType findProductTypeByCode(String code) throws Exception {
        return productTypeRepository.findByCode(code).orElseThrow(() -> new Exception(PRODUCT_TYPE_NO_FOUND + code));
    }

    public ProductType addProductType(ProductType productType) {
        if (productTypeRepository.findByCode(productType.getCode()).isPresent())
            throw new FindException(PRODUCT_TYPE_EXIST);
        return productTypeRepository.save(productType);
    }

    public ProductType updateProductType(ProductType productType) {
        return productTypeRepository.save(productType);
    }

    public void deleteProductType(ProductType productType) {
        productType.setVisible(false);
        productTypeRepository.save(productType);
    }
}
