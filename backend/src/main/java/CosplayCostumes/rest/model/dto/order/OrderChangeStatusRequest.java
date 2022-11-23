package CosplayCostumes.rest.model.dto.order;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderChangeStatusRequest {
    private Long id;
    private Long statusId;
}
