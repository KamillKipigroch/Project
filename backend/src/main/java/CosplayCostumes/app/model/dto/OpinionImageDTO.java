package CosplayCostumes.app.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class OpinionImageDTO implements Serializable {
    private long opinionID;
    private String code;
}
