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

    @Column(nullable = false, unique = true)
    private String businessKey;

    @OneToMany
    @JoinColumn(name = "product_image_id")
    private Set<ProductImage> images;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "quality_condition_id")
    private QualityCondition qualityCondition;

    @OneToMany
    @JoinColumn(name = "opinion_id")
    private Set<Opinion> opinions;

    @OneToMany
    @JoinColumn(name = "order_id")
    private Set<Order> orders;

    @Column(nullable = false, unique = true)
    private String code;

    private String description;

    private Double price;

    private String character;

    private LocalDateTime createDate;

    private Boolean visible;

    public Product(String businessKey, Set<ProductImage> images, Category category, QualityCondition qualityCondition, String code, String description, Double price, String character, LocalDateTime createDate) {
        this.businessKey = businessKey;
        this.images = images;
        this.category = category;
        this.qualityCondition = qualityCondition;
        this.code = code;
        this.description = description;
        this.price = price;
        this.character = character;
        this.createDate = createDate;
        this.opinions = new HashSet<>();
        this.orders = new HashSet<>();
        this.visible = true;
    }
}
