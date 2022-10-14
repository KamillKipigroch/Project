package CosplayCostumes.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "quality_t")
@NoArgsConstructor
@Getter
@Setter
public class Quality implements Serializable {
    @Id
    @SequenceGenerator(name = "s_quality",
            sequenceName = "s_quality",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_quality"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    @OneToMany(mappedBy = "quality")
    private Set<Product> products = new HashSet<>();

    private String code;

    private Boolean visible;

    public Quality(String code) {
        this.code = code;
    }
}
