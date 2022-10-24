package CosplayCostumes.rest.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class OpinionImageDTO implements Serializable {
    private String code;
    private Long opinionId;
}
