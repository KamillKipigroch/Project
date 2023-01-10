package CosplayCostumes.rest.model.dto.product;

import CosplayCostumes.rest.model.dto.productImage.ProductImageDTO;
import lombok.Data;

import java.io.Serializable;
import java.util.Set;

@Data
public class ProductDTO implements Serializable {
    private Long productTypeID;
    private Long subCategoryID;
    private Long conditionID;
    private Long qualityID;
    private String code;
    private String size;
    private String description;
    private Double price;
    private String hero;
    private Set<ProductImageDTO> productImages;
}
