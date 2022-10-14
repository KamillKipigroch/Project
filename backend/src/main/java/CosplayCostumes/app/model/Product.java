package CosplayCostumes.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product_t")
@NoArgsConstructor
@Getter
@Setter
public class Product implements Serializable {
    @Id
    @SequenceGenerator(name = "s_product",
            sequenceName = "s_product",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_product"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    private String businessKey;

    @ManyToOne
    @JoinColumn(name = "product_type_id")
    private ProductType productType;

    @OneToMany(mappedBy = "product")
    private Set<ProductImage> images = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "condition_id")
    private Condition condition;

    @ManyToOne
    @JoinColumn(name = "qualityu_id")
    private Quality quality;
    @OneToMany(mappedBy = "product")
    private Set<Opinion> opinions = new HashSet<>();

    @OneToMany(mappedBy = "product")
    private Set<Order> orders = new HashSet<>();

    private String code;

    @Column(length=1000)
    private String description;

    private Double price;

    private String hero;

    private LocalDateTime createDate;

    private Boolean visible;

}
