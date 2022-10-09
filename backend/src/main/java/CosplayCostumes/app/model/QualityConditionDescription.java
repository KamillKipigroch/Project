package CosplayCostumes.app.model;

import javax.persistence.Table;

@Table(name = "quality_condition_description_t")
public enum QualityConditionDescription {
    New,
    VeryGood,
    Good,
    NoTooBad
}
