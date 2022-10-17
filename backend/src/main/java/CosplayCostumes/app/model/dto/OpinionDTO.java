package CosplayCostumes.app.model.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.LocalDateTime;

@Data
public class OpinionDTO {
    @Min(1)
    @Max(5)
    private Double value;
    private String description;
    private LocalDateTime createDate;
}
