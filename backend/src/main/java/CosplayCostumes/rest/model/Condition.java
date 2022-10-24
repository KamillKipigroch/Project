package CosplayCostumes.rest.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "condition_t")
@NoArgsConstructor
@Getter
@Setter
public class Condition implements Serializable {
    @Id
    @SequenceGenerator(name = "s_condition",
            sequenceName = "s_condition",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_condition"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    @OneToMany(mappedBy = "condition")
    private Set<Product> products = new HashSet<>();
    private int price;

    private String code;

    private Boolean visible;

    public Condition(int price, String code) {
        this.price = price;
        this.code = code;
        this.visible = true;
    }
}
