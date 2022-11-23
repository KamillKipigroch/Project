package CosplayCostumes.rest.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "order_status_t")
@NoArgsConstructor
@Getter
@Setter
public class OrderStatus implements Serializable {
    @Id
    @SequenceGenerator(name = "s_order_status",
            sequenceName = "s_order_status",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_order_status"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    private String code;

    private Boolean visible;
    @Column(nullable = false, unique = true)
    private int level;

    public OrderStatus(String code, int level) {
        this.code = code;
        this.level = level;
        this.visible = true;
    }
}
