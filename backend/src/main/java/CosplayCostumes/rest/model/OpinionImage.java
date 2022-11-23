package CosplayCostumes.rest.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "opinion_image_t")
@NoArgsConstructor
@Getter
@Setter
public class OpinionImage implements Serializable {
    @Id
    @SequenceGenerator(name = "s_opinion_image",
            sequenceName = "s_opinion_image",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "s_opinion_image"
    )
    @Column(nullable = false, updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "opinion_id")
    @JsonIgnore
    private Opinion opinion;

    private String code;

    private Boolean visible;


    public OpinionImage(String code, Opinion opinion) {
        this.code = code;
        this.opinion = opinion;
        this.visible = true;
    }
}
