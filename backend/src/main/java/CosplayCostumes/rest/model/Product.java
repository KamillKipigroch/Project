package CosplayCostumes.rest.model;

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
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;

    @ManyToOne
    @JoinColumn(name = "condition_id")
    private Condition condition;

    @ManyToOne
    @JoinColumn(name = "quality_id")
    private Quality quality;

    @OneToMany(mappedBy = "product")
    private Set<Opinion> opinions = new HashSet<>();

    private String code;

    @Column(length=1000)
    private String description;

    private Double price;

    private String hero;

    private LocalDateTime createDate;

    private Boolean visible;

    public Product(String businessKey, ProductType productType, Set<ProductImage> images, Subcategory subcategory, Condition condition, Quality quality, Set<Opinion> opinions, Set<Order> orders, String code, String description, Double price, String hero, LocalDateTime createDate) {
        this.businessKey = businessKey;
        this.productType = productType;
        this.images = images;
        this.subcategory = subcategory;
        this.condition = condition;
        this.quality = quality;
        this.opinions = opinions;
        this.code = code;
        this.description = description;
        this.price = price;
        this.hero = hero;
        this.createDate = createDate;
        this.visible = true;
    }
}
