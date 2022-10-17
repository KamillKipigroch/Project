package CosplayCostumes.app.model.dto;

import CosplayCostumes.user.model.User;
import lombok.Data;

@Data
public class OrderDTO {
    private Long productID;
    private User userID;
}
