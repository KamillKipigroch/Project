package CosplayCostumes.rest.model.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Set;

@Data
public class OpinionDTO {
    private Long UserID;
    private Long ProductID;
    @Min(1)
    @Max(5)
    private Double value;
    private String description;
    private Set<OpinionImageDTO> opinionImages;
}
