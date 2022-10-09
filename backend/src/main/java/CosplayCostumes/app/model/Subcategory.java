package CosplayCostumes.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "sub_category_t")
@NoArgsConstructor
@Getter
@Setter
public class Subcategory implements Serializable {
    @Id
    @SequenceGenerator(name = "s_sub_category",
            sequenceName = "s_sub_category",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_sub_category"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    @OneToMany
    @JoinColumn(name = "category_id")
    private Set<Category> categories;

    @Column(nullable = false, unique = true)
    private String code;

    private String description;

}
