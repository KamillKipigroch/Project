package CosplayCostumes.rest.model.dto.opinion;

import CosplayCostumes.rest.model.dto.opinionImage.OpinionImageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@AllArgsConstructor
@Data
public class OpinionResponse {
    private Long id;
    private String UserEmail;
    private Long ProductID;
    private String productName;
    private Double value;
    private String description;
    private Set<OpinionImageDTO> opinionImages;
}
