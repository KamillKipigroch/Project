package CosplayCostumes.rest.model;

import CosplayCostumes.security.user.model.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "opinion_t")
@NoArgsConstructor
@Getter
@Setter
public class Opinion implements Serializable {
    @Id
    @SequenceGenerator(name = "s_opinion",
            sequenceName = "s_opinion",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_opinion"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    Product product;

    private Double value;

    private String description;

    private LocalDateTime createDate;

    private Boolean visible;


    public Opinion(User user, Product product, Set<OpinionImage> images, Double value, String description, LocalDateTime createDate) {
        this.user = user;
        this.product = product;
        this.value = value;
        this.description = description;
        this.createDate = createDate;
        this.visible = true;
    }
}
