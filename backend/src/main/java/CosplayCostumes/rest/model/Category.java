package CosplayCostumes.rest.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
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

    private String code;

    private Boolean visible;

    public Category(String code) {
        this.code = code;
        this.visible = true;
    }
}
