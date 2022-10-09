package CosplayCostumes.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "quality_condition_t")
@NoArgsConstructor
@Getter
@Setter
public class QualityCondition implements Serializable {
    @Id
    @SequenceGenerator(name = "s_quality_condition",
            sequenceName = "s_quality_condition",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_quality_condition"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    private int price;

    private QualityConditionDescription qualityConditionDescription;

    private Boolean visible;

    public QualityCondition(int price, QualityConditionDescription qualityConditionDescription) {
        this.price = price;
        this.qualityConditionDescription = qualityConditionDescription;
        this.visible = true;
    }
}
