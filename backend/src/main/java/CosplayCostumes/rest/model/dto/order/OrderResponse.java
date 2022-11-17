package CosplayCostumes.rest.model.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Long statusId;
    private String statusCode;
    private Long productID;
    private String productName;
    private Long userID;
    private String userName;
}
