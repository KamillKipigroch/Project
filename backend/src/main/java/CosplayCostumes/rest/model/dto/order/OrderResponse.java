package CosplayCostumes.rest.model.dto.order;

import lombok.Data;

@Data
public class OrderResponse {
    private Long id;
    private String code;
    private Long productID;
    private String productName;
    private Long userID;
    private String userName;
}
