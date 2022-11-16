package CosplayCostumes.rest.model.dto.condition;

import lombok.Data;

import javax.validation.constraints.Max;

@Data
public class ConditionDTO {
    @Max(100)
    private int price;
    private String code;
}
