package CosplayCostumes.rest.model;

import CosplayCostumes.security.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @SequenceGenerator(name = "s_opinion", sequenceName = "s_opinion", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "s_opinion")
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"opinions", "userRole", "username", "authorities", "accountNonExpired", "credentialsNonExpired", "accountNonLocked"})
    User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnoreProperties({"businessKey", "productType", "images", "subcategory", "condition", "quality", "opinions", "code", "description", "price", "hero", "createDate", "visible",})
    Product product;

    private Double value;
    @Column(length = 1000)
    private String description;

    @OneToMany(mappedBy = "opinion", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"opinion"})
    private Set<OpinionImage> opinionImages;

    private LocalDateTime createDate;

    private Boolean visible;


    public Opinion(User user, Product product, Double value, String description, LocalDateTime createDate) {
        this.user = user;
        this.product = product;
        this.value = value;
        this.description = description;
        this.createDate = createDate;
        this.visible = true;
    }
}
