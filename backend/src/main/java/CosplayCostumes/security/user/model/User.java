package CosplayCostumes.security.user.model;

import CosplayCostumes.rest.model.Opinion;
import CosplayCostumes.rest.model.Order;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("USER")
@Entity
@Table(name = "user_t")
public class User implements UserDetails {
    @Id
    @SequenceGenerator(name = "user_s",
    sequenceName = "user_s",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_s"
    )
    private Long id;

    @OneToMany
    @JoinColumn(name = "opinion_id")
    private Set<Opinion> opinion;

    @OneToMany
    @JoinColumn(name = "order_id")
    private Set<Order> orders;
    private String firstName;

    private String lastName;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private String email;

    private String password;

    private String image;

    private String token;

    private Boolean locked;

    private Boolean enabled;

    public User(String firstName, String lastName, String email, String password, UserRole userRole) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.opinion = new HashSet<>();
        this.orders = new HashSet<>();
        this.locked = false;
        this.enabled = false;
    }


    public User(String email, String password, UserRole userRole) {
        this.email = email;
        this.password = password;
        this.userRole = userRole;
        this.opinion = new HashSet<>();
        this.orders = new HashSet<>();
        this.locked = false;
        this.enabled = true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userRole.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !locked;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}