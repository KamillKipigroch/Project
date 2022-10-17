package CosplayCostumes.app.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Data
public class ProductDTO implements Serializable {
    private Long productTypeID;
    private Long categoryID;
    private Long conditionID;
    private Long qualityID;
    private String code;
    private String description;
    private Double price;
    private String hero;
    private LocalDateTime createDate;
}
