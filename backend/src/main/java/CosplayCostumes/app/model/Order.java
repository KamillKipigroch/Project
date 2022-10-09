package CosplayCostumes.app.model;

import CosplayCostumes.user.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "order_t")
@NoArgsConstructor
@Getter
@Setter
public class Order implements Serializable {
    @Id
    @SequenceGenerator(name = "s_order",
            sequenceName = "s_order",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_order"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    public Order(Product product, User user) {
        this.product = product;
        this.user = user;
    }
}
