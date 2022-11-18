package CosplayCostumes.rest.model.dto.productImage;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductImageDTO {
    private Long productID;
    private String fileUrl;
}
