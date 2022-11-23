package CosplayCostumes.rest.model.dto.opinion;

import CosplayCostumes.rest.model.dto.image.ImageDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Set;

@Data
public class OpinionRequest {
    private String emailUser;
    private Long ProductID;
    @Min(1)
    @Max(5)
    private Double value;
    private String description;
    @JsonIgnoreProperties({"opinionId"})
    private Set<ImageDTO> opinionImages;
}