package CosplayCostumes.rest.model.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductImageDTO {
    private Long productID;
    private MultipartFile file;
}
