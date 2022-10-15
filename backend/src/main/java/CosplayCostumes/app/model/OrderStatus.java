package CosplayCostumes.app.model;

import CosplayCostumes.user.model.User;
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

    @OneToMany(mappedBy = "orderStatus")
    private Set<Order> order;

    private String code;

    private Boolean visible;

    public OrderStatus(Set<Order> order, String code) {
        this.order = order;
        this.code = code;
        this.visible = true;
    }

    public OrderStatus(String code) {
        this.code = code;
        this.visible = true;
    }
}
