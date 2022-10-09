package CosplayCostumes.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "product_image_t")
@NoArgsConstructor
@Getter
@Setter
public class ProductImage implements Serializable {
    @Id
    @SequenceGenerator(name = "s_product_image",
            sequenceName = "s_product_image",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_product_image"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false, unique = true)
    private String code;

    private Boolean visible;

    public ProductImage(String code, Product product) {
        this.code = code;
        this.product = product;
        this.visible = true;
    }
}
