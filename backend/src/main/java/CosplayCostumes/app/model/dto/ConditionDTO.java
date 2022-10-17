package CosplayCostumes.app.model.dto;

import lombok.Data;

import javax.validation.constraints.Max;

@Data
public class ConditionDTO {
    @Max(100)
    private int price;
    private String code;
}
