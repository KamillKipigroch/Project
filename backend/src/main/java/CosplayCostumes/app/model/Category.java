package CosplayCostumes.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "category_t")
@NoArgsConstructor
@Getter
@Setter
public class Category implements Serializable {
    @Id
    @SequenceGenerator(name = "s_category",
            sequenceName = "s_category",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_category"
    )
    @Column(nullable = false, updatable = false)
    private Long id;
    @Column(nullable = false, unique = true)
    private String code;

    @OneToMany
    @JoinColumn(name = "subcategory_id")
    private Set<Subcategory> subcategories;

    @OneToMany
    @JoinColumn(name = "product_id")
    private Set<Product> product;

    private Boolean visible;

    public Category(String code, Set<Subcategory> subcategories) {
        this.code = code;
        this.subcategories = subcategories;
        this.visible = true;
    }
}
